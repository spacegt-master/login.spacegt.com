import { defineStore } from "pinia";
import { ref } from "vue";

const APPKEY = "FFFF00000000017AC35D";
const SCENE = "ic_login_h5";

export const useAimosoStore = defineStore("aimoso", () => {
  const nvcData = ref({});

  const initNvc = () => {
    AWSC.use("nvc", function (state, module) {
      // 初始化 调用module.init进行初始化
      window.nvc = module.init({
        // 应用类型标识。它和使用场景标识（scene字段）一起决定了无痕验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
        appkey: APPKEY,
        //使用场景标识。它和应用类型标识（appkey字段）一起决定了无痕验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的scene值，请务必正确填写。
        scene: SCENE,
        // 二次验证获取人机信息串，跟随业务请求一起上传至业务服务器，由业务服务器进行验签。
        success: function (data) {
          window.console && console.log(data);
        },
        // 前端二次验证失败时触发该回调参数
        fail: function (failCode) {
          window.console && console.log(failCode);
        },
        // 前端二次验证加载异常时触发该回调参数。
        error: function (errorCode) {
          window.console && console.log(errorCode);
        },
      });
      try {
        const nvcVal = JSON.parse(decodeURIComponent(window.nvc.getNVCVal()));
        nvcData.value.token = nvcVal.c;
      } catch (e) {
        console.error("NVCVal deserialization failed");
      }
    });

    // 处理业务返回结果：人机信息串上传接口的回调函数，通过业务服务端的返回结果，控制无痕验证的不同状态。
    window.jsonp_aimoso = function (json) {
      nvcData.value.sessionId = json.result.result.sessionId;
      nvcData.value.sig = json.result.result.sig;
      //   // 业务服务器请求回调控制是否需要二次验证
      //   if (json.result.code === 100 || json.result.code === 200) {
      //     // 无痕验证通过
      //     alert("register success!");
      //   } else if (json.result.code === 800 || json.result.code === 900) {
      //     // 无痕验证失败，直接拦截
      //     alert("register failed!");
      //   } else if (json.result.code === 400) {
      //     // 无痕验证失败，触发二次验证
      //     // 二次验证码（滑动验证码）配置项设置，详情请见滑动验证集成方式文档
      //     // 二次验证的appkey，scene，test值及success，fail，error的回调由nvc初始化时决定，请不要在二次验证时传入
      //     var ncoption = {
      //       // 声明滑动验证需要渲染的目标ID。
      //       renderTo: "nc",
      //     };
      //     // 唤醒二次验证（滑动验证码）
      //     window.nvc.getNC(ncoption);
      //   }
    };
  };

  const getNVCValAsync = () => {
    return new Promise((resolve, reject) => {
      window.nvc.getNVCValAsync(function (nvcVal) {
        // 获取人机信息串
        // 将以下getNVCVal()函数的值，跟随业务请求一起上传，由后端请求AnalyzeNvc接口并返回200，400，600或者800。
        // 正式上线前务必将该服务端接口，更改为您自己的业务服务端接口
        loadScript(
          "https://cf.aliyun.com/nvc/nvcAnalyze.jsonp?callback=jsonp_aimoso&a=" +
            nvcVal
        )
          .then(() => resolve())
          .catch(() => reject());
      });
    });
  };

  return {
    nvcData,
    initNvc,
    getNVCValAsync,
  };
});
