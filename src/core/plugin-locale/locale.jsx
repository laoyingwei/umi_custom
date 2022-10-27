
import { ConfigProvider } from 'antd'
import React,{ useState }from 'react';
import { getPluginManager } from '@/core/plugin';
import enUS0 from 'antd/es/locale/en_US';
import zhCN0 from 'antd/es/locale/zh_CN';
// import warning from 'F:/learn/umi_custom/node_modules/.pnpm/warning@4.0.3/node_modules/warning';
import { createIntl } from 'react-intl';
import { LocaleContext } from './context';
import customeEnUS from "@/locales/en-US.js";
import customeZhCN from "@/locales/zh-CN.js";
import EventEmitter from 'event-emitter';
import moment from 'moment'
const useLocalStorage = true;
const event = new EventEmitter();
const LANG_CHANGE_EVENT = Symbol('LANG_CHANGE');
let g_intl = ''
const localeInfo = {
  'en-US': {
    messages: {
      ... (customeEnUS || {}),
    },
    locale: 'en-US',
    antd: {
      ...enUS0,
    },
    momentLocale: '',
  },
  'zh-CN': {
    messages: {
      ...(customeZhCN || {}),
    },
    locale: 'zh-CN',
    antd: {
      ...zhCN0,
    },
    momentLocale: 'zh-cn',
  }
};


const getIntl = (locale, changeIntl) => {

  if (g_intl && !changeIntl && !locale) {
    return g_intl;
  }
  // 如果存在于 localeInfo 中
  if (locale && localeInfo[locale]) {
    return createIntl(localeInfo[locale]);
  }
  // 不存在需要一个报错提醒
  if (!locale || !!localeInfo[locale]) {
    console.warn(`The current popular language does not exist, please check the locales folder!`)
  }
  // 使用 zh-CN
  if (localeInfo["zh-CN"]) return createIntl(localeInfo["zh-CN"]);

  // 如果还没有，返回一个空的
  return createIntl({
    locale: "zh-CN",
    messages: {},
  });
};

export const setIntl = (locale) => {
  g_intl = getIntl(locale, true);
};


const getLocale = () => {
  const runtimeLocale = getPluginManager().applyPlugins({
    key: 'locale',
    // workaround: 不使用 ApplyPluginsType.modify 是为了避免循环依赖，与 fast-refresh 一起用时会有问题
    type: 'modify',
    initialValue: {},
  });
  // console.log(runtimeLocale)
  if (typeof runtimeLocale?.getLocale === 'function') {
    return runtimeLocale.getLocale()
  }

  const lang = navigator.cookieEnabled && typeof localStorage !== 'undefined' && useLocalStorage ? window.localStorage.getItem('umi_locale') : ''
  let browserLang;
  const isNavigatorLanguageValid =
    typeof navigator !== 'undefined' && typeof navigator.language === 'string';
  browserLang = isNavigatorLanguageValid
    ? navigator.language.split('-').join('-')
    : '';
  return lang || browserLang || "en-US";
  // return 'en-US'
}


export const setLocale = (lang, realReload) => {
  const updater = () => {
    if (getLocale() !== lang) {
      if (navigator.cookieEnabled && typeof window.localStorage !== 'undefined' && useLocalStorage) {
        window.localStorage.setItem('umi_locale', lang || '');
     }
      setIntl(lang);
      if (realReload) {
        window.location.reload();
      } else {
        event.emit(LANG_CHANGE_EVENT, lang);
        // chrome 不支持这个事件。所以人肉触发一下
        if (window.dispatchEvent) {
          const event = new Event('languagechange');
          window.dispatchEvent(event);
        }
      }
    }
  }
  updater()
}

export const addLocale = (opts = {}) => {
  const {
    name,
    messages,
    extraLocales,
  } = opts
  const { momentLocale, antd } = extraLocales

  if(!name) return;

  const merageMessage = localeInfo[name]?.messages ? Object.assign({},localeInfo[name].messages,messages) : messages
  const locale = name.split('-').join('-')
  localeInfo[name] = {
    messages:merageMessage,
    locale,
    momentLocale,
    antd

  }
  if(locale === getLocale()) {
      event.emit(LANG_CHANGE_EVENT,locale)
  }

}



const getDirection = () => {
  const lang = getLocale();
  // array with all prefixs for rtl langueges ex: ar-EG , he-IL
  const rtlLangs = ['he', 'ar', 'fa', 'ku']
  const direction = rtlLangs.filter(lng => lang.startsWith(lng)).length ? 'rtl' : 'ltr';
  return direction;
};

const setMomentLocale =  (locale) =>  {
  if (moment?.locale) {
    moment.locale(localeInfo[locale]?.momentLocale || 'en');
  }
}

export const _LocaleContainer = (props) => {

  const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? React.useLayoutEffect
    : React.useEffect
  const initLocale = getLocale();
  const [locale, setLocale] = React.useState(initLocale);
  const [intl, setContainerIntl] = React.useState(() => getIntl(locale, true));
  const direction = getDirection();
  const handleLangChange = (locale) => {
    ///设置日期格式化的国际化
    setMomentLocale(locale)

    //设置 antd design 的组件的国际化
    setLocale(locale);
    ///全局国际化语言的设置 可以通过 useLocalData 使用 可以使用 LocaleContext.Consumer 使用
    setContainerIntl(getIntl(locale));
  };
  useIsomorphicLayoutEffect(() => {
    event.on(LANG_CHANGE_EVENT,  handleLangChange);
    return () => {
      event.off(LANG_CHANGE_EVENT, handleLangChange);
    };
  }, []);
  const defaultAntdLocale = {
  }
  ///设置日期格式化的国际化
  setMomentLocale(locale)
  // prefixCls="custom"
  return (
    <ConfigProvider direction={direction} locale={localeInfo[locale]?.antd || defaultAntdLocale}>
      <LocaleContext.Provider value={intl}>{props.children}</LocaleContext.Provider>
    </ConfigProvider>
  )
}