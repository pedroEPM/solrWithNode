# solrWithNode


# install this: https://tecadmin.net/how-to-install-apache-solr-on-ubuntu-22-04/

# sudo su - solr -c "/opt/solr/bin/solr create -c cMegamedia -n data_driven_schema_configs" 

# http://host:port/solr/[core name]/update?stream.body=<delete><query>*:*</query></delete>&commit=true