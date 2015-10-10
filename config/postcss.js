module.exports = {
    options: {
      map: false, // inline sourcemaps
      processors: [
        require('pixrem')(), // add fallbacks for rem units
        require('autoprefixer')({browsers: 'last 2 versions'}),
        require('postcss-zindex')(), // add vendor prefixes
        require('cssnano')() // minify the result
      ]
    },
    dist: {
      src: 'assets/css/styles.css' ,
      dest: 'assets/css/styles.min.css'
    }
 };
  
