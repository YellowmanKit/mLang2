import React from 'react'
import Component from '/component/Component'
import { RNCamera } from 'react-native-camera';

export default class Camera extends Component {

  content({ store: { main: { camera } } }){
    if(!camera){ return null }
    return this.camera(this.app)
  }

  camera({ func, button, store: { ui: { window, style } }, action: { main } }){
    return(
      <div style={{ ...window, ...style.flexColCC, position: 'absolute', backgroundColor: 'black' }}>
        <RNCamera
          ref={ref => { this.cam = ref }}
          style={{ ... window, position: 'absolute' }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: func.multiLang('Permission required','要求權限','要求权限'),
            message: func.multiLang('Allow mLang to access your phone camera?','准許mLang使用照相機?','准许mLang使用照相机?'),
            buttonPositive: func.multiLang('Yes','是','是'),
            buttonNegative: func.multiLang('No','否','否')
          }}
          androidRecordAudioPermissionOptions={{
            title: func.multiLang('Permission required','要求權限','要求权限'),
            message: func.multiLang('Allow mLang to record audio?','准許mLang進行錄音?','准许mLang进行录音?'),
            buttonPositive: func.multiLang('Yes','是','是'),
            buttonNegative: func.multiLang('No','否','否')
          }}
        />
        {button.back({ onPress: ()=>{ main.set('camera', false) } })}
        <div style={{ ...this.size(1,0.6), ...style.flexColCE}}>
          {button.cameraShot({ background: require('res/image/button/camera.png'), onPress: ()=>{ this.onCameraShot(this.app) }})}
        </div>
      </div>
    )
  }

  async onCameraShot({ func, action: { main } }){
    var err, data
    if (this.cam) {
      [err, data] = await func.to(this.cam.takePictureAsync({ quality: 0.5, base64: true }))
      if(data){ main.set('photo', data) }
    }
    main.set('camera', false)
  }

}
