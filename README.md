# solrWithNode


# install this: https://tecadmin.net/how-to-install-apache-solr-on-ubuntu-22-04/

# sudo su - solr -c "/opt/solr/bin/solr create -c cMegamedia -n data_driven_schema_configs" 
# sudo su - solr -c "/opt/solr/bin/solr delete -c cMegamedia" 




# http://host:port/solr/[core name]/update?stream.body=<delete><query>*:*</query></delete>&commit=true



<!-- sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock    
sudo service mongod restart -->

<!-- sudo mkdir -p /data/db/
sudo chown $(id -u) /data/db -->