export default class Media {

  constructor(props){
    this.props = props
    this.cache = {}
  }

  async source({ name, path, type }){
    if(!name){ return '' }
    if(name.path){
      //console.log('use path')
      return name.path
    }
    if(this.cache[name]){
      //console.log('use cache data')
      return this.cache[name]
    }else{
      const local = await this.local({ name, type }, this.props)
      if(local){
        //console.log('use local data')
        return local
      }
      const download = await this.download({ name, type }, this.props)
      if(download){
        //console.log('use download data')
        return download
      }
    }
    //console.log('use uri')
    var uri = this.props.url({ name, type })
    return { uri }
  }

  async download({ name, type }, { fetchBlob, write }){
    if(!name || !type){ return null }
    const blob = await fetchBlob({ name, type })
    if(blob){
      const base64 = await blob.readFile('base64')
      await write({ name, data: base64, encode: 'base64' })
      if(type.includes('Icon')){
        const uri = this.base64ToUri(base64, type)
        this.cache[name] = uri
        return uri
      }
      if((type.includes('Audio') || type.includes('audio'))){
        return this.fileUrl(name)
      }
    }
    //console.log('download error')
    return null
  }

  async local({ name, type }, { read, fileExist }){
    const exist = await fileExist(name)
    if(!exist){ return false }
    if(type.includes('Icon')){
      const base64 = await read({ name, encode: 'base64' })
      if(base64){
        const uri = this.base64ToUri(base64, type)
        this.cache[name] = uri
        return uri
      }
    }
    if((type.includes('Audio') || type.includes('audio'))){
      return this.fileUrl(name)
    }
    return null
  }

  base64ToUri(base64, type){
    const mimeType = (type.includes('Audio') || type.includes('audio'))? 'audio':'image'
    return { uri: 'data:' + mimeType + '/*;base64,' + base64 }
  }

  fileUrl(name){
    var fileUrl =  'file:' + this.props.path + '/' + name
    this.cache[name] = fileUrl
    return fileUrl
  }

}
