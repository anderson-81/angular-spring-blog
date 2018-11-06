const proxy = [
  {
    context: '/334debcfbdc435a8be6114154ea397098f232757ae4acc3e061186a8b06d20140a32e8a5b03e4018589aa045d697abbe28f2646c7ff2515bf63c0da6b18f71a6',
    target: 'http://localhost:8080',
    pathRewrite: {'^/334debcfbdc435a8be6114154ea397098f232757ae4acc3e061186a8b06d20140a32e8a5b03e4018589aa045d697abbe28f2646c7ff2515bf63c0da6b18f71a6' : ''}
  }
];
module.exports = proxy;