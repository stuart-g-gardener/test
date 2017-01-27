curl -X POST -d '<jenkins><install plugin="'$1'@latest" /></jenkins>' --header 'Content-Type: text/xml' $2/pluginManager/installNecessaryPlugins
