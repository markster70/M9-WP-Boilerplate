## Guidance for deploying to a Production Server

The roots Wordpress architecture that is used in the build requires a different type of setup on a productiion 
server to a lot of Wordpress Web Hosting platforms .  

You can read about this here :  

https://roots.io/ 

If you are deploying to a standard WP host, such as Fasthosts, or WP Engine for example, here is how to go about a deployment :   

- Set up a clean wordpress install on the production server  
- Make a note of the WP URL to add into wp_options table later  
- Take SQL dump of your local database from MAMP / WAMP / XAMP > PHPmyAdmin  
- Access PHP Admin on production server and drop all tables from the  production WP database  
- Import SQL dump into that production WP database  
- Change the site_url and home values in wp_options table to the WP URL on your production server  
- In vite.config.js replace the base config line ( around line 31) with this :  
``` 
base: process.env.NODE_ENV === 'development' ? `` : `/wp-content/themes/${themeName}/dist/`
```

- Run NPM run build at root of project

- Upload following directories to wp_content directory on Production Server

themes/{yourthemename}  
uploads  
plugins  
mu-plugins  

#### THERE IS NO NEED TO DO A FULL LOAD OF ALL FILES IN THE LOCAL REPO - JUST THOSE LISTED ABOVE

- Add the following line to wp-config.php remotely :  
``` 
define('WP_ENVIRONMENT_TYPE', 'production');  
```
- If you have used a database prefix, be sure to add this to wp-config.php under $table_prefix  
```
$table_prefix = 'wp_yourprefix'  
```

#### NOW ACTIVATE YOUR THEME IN WP-ADMIN

You should have a fully functional site
