npm install

out=$1
shift    
node node_modules/less/bin/lessc  $@ > $out
