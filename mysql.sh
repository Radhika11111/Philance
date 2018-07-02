#!/bin/bash
#
#	AUTHOR - Raman Sailopal
#
#	Automated script to allow remote access to local mysql instance
#
pass=$(awk '/root_password/ { print $2 }' /etc/openproject/installer.dat)
mysql --user=root --password=$pass -e "SHOW DATABASES;" | grep -q "philance"
if [[ "$?" == "1" ]]
then
	mysql --user=root --password=$pass < /opt/openproject/public/Philance/SQL_Tables.sql
	mysql --user=root --password=$pass < /opt/openproject/public/Philance/SQL_Insert.sql
	mysql --user=root --password=$pass -e "GRANT ALL PRIVILEGES ON philance.* TO 'philance'@'localhost' IDENTIFIED BY 'ph1ldb';"
fi
mysql --user=root --password=$pass -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;"
if test -f /opt/openproject/public/Philance/mysql.sql
then
      mysql --user=root --password=$pass < /opt/openproject/public/Philance/mysql.sql
fi
