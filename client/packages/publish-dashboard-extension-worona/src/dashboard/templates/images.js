export default (baseUrl) => [
  /* Icons */
    // Default
  {
    fileName: 'icon.png',
    type: 'icon',
    url: `${baseUrl}?fit=crop&h=128&w=128&fm=png`,
  },
    // Android
  {
    type: 'icon',
    fileName: 'xxxhdpi-icon.png',
    platform: 'android',
    url: `${baseUrl}?fit=crop&h=192&w=192&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'xxhdpi-icon.png',
    platform: 'android',
    url: `${baseUrl}?fit=crop&h=144&w=144&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'xhdpi-icon.png',
    platform: 'android',
    url: `${baseUrl}?fit=crop&h=96&w=96&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'hdpi-icon.png',
    platform: 'android',
    url: `${baseUrl}?fit=crop&h=72&w=72&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'mdpi-icon.png',
    platform: 'android',
    url: `${baseUrl}?fit=crop&h=48&w=48&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'ldpi-icon.png',
    platform: 'android',
    url: `${baseUrl}?fit=crop&h=36&w=36&fm=png`,
  },
    // iOS
  {
    type: 'icon',
    fileName: 'icon.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=57&w=57&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon@2x.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=114&w=114&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-40.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=40&w=40&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-40@2x.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=80&w=80&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-50.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=50&w=50&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-50@2x.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=100&w=100&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-60.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=60&w=60&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-60@2x.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=120&w=120&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-60@3x.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=180&w=180&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-72.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=72&w=72&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-72@2x.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=144&w=144&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-76.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=76&w=76&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-76@2x.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=152&w=152&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-small.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=29&w=29&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-small@2x.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=58&w=58&fm=png`,
  },
  {
    type: 'icon',
    fileName: 'icon-small@3x.png',
    platform: 'ios',
    url: `${baseUrl}?fit=crop&h=87&w=87&fm=png`,
  },
  /* Splash screens */
    // Android
  {
    type: 'screen',
    fileName: 'ldpi.png',
    platform: 'android',
    url: `http://worona.imgix.net/splashes/watermark/ldpi.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },
  {
    type: 'screen',
    fileName: 'mdpi.png',
    platform: 'android',
    url: `http://worona.imgix.net/splashes/watermark/mdpi.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },
  {
    type: 'screen',
    fileName: 'hdpi.png',
    platform: 'android',
    url: `http://worona.imgix.net/splashes/watermark/hdpi.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },
  {
    type: 'screen',
    fileName: 'xhdpi.png',
    platform: 'android',
    url: `http://worona.imgix.net/splashes/watermark/xhdpi.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },
  {
    type: 'screen',
    fileName: 'xxhdpi.png',
    platform: 'android',
    url: `http://worona.imgix.net/splashes/watermark/xxhdpi.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },
  {
    type: 'screen',
    fileName: 'xxxhdpi.png',
    platform: 'android',
    url: `http://worona.imgix.net/splashes/watermark/xxxhdpi.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },
    // ios
  {
    type: 'screen',
    fileName: 'Default.png',
    platform: 'ios',
    url: `http://worona.imgix.net/splashes/watermark/Default.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },
  {
    type: 'screen',
    fileName: 'Default@2x.png',
    platform: 'ios',
    url: `http://worona.imgix.net/splashes/watermark/Default@2x.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },
  {
    type: 'screen',
    fileName: 'Default-568h@2x.png',
    platform: 'ios',
    url: `http://worona.imgix.net/splashes/watermark/Default-568h@2x.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },
  {
    type: 'screen',
    fileName: 'Default-667h@2x.png',
    platform: 'ios',
    url: `http://worona.imgix.net/splashes/watermark/Default-667h@2x.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },
  {
    type: 'screen',
    fileName: 'Default-Portrait-736h@3x.png',
    platform: 'ios',
    url: `http://worona.imgix.net/splashes/watermark/Default-Portrait-736h@3x.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },
  {
    type: 'screen',
    fileName: 'Default-Portrait@2x.png',
    platform: 'ios',
    url: `http://worona.imgix.net/splashes/watermark/Default-Portrait@2x.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },
  {
    type: 'screen',
    fileName: 'Default-Portrait.png',
    platform: 'ios',
    url: `http://worona.imgix.net/splashes/watermark/Default-Portrait.png?markalign=center%2Cmiddle&markscale=45&markfit=max&mark=${baseUrl}`,
  },

];
