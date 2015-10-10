####Web project starter

A blank html5 project with grunt and bower

**grunt modules:**

```
* time-grunt
* jit-grunt
* autoprefixer
* cssnano
* grunt-contrib-concat  
* grunt-contrib-jshint
* grunt-contrib-less
* grunt-contrib-uglify
* grunt-patch
* grunt-postcss
* jit-grunt"
* load-grunt-configs"
* pixrem": "2.0.0
* postcss-zindex
* time-grunt
```


**bower dependencies:**

```
* bootstrap
* jquery
```

Grunt is configured to compile Bootstrap from js and less. You can find al grunt configs in the config folder

**INSTALL**

```
git clone https://github.com/AndreaGvA/webProjectStarter.git
cd webProjectStarter

npm install
bower install

```

**USAGE**

The main files are in src directory:

```
//your js scrpit goes here (or you can add more files in the concat configs. Don't forget to jshint new files):
src/js/main.js

//your less goes here
src/less/main.less

//don't forget to run grunt command to compile your coding before testing it in a browser

```
