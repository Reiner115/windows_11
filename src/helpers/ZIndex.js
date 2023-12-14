export default class ZIndex{

    static zIndex = 0;
    static getZIndex(){
      this.zIndex = this.zIndex+1;
      return this.zIndex;
    }
  
  }