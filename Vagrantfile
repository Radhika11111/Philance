Vagrant.configure("2") do |config|
  config.vm.box = "Philance/Centos7"
  config.vm.network "forwarded_port", guest: 80, host: 80, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 8080, host: 8080, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 81, host: 81, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 3306, host: 3306, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 3000, host: 3000, host_ip: "127.0.0.1"
  config.vm.synced_folder "C:\\Windows\\System32\\drivers\\etc", "/home/Philance"
  config.vm.synced_folder "C:\\HashiCorp\\Philance\\Share\\Philance", "/opt/openproject/public/Philance"
  config.vm.synced_folder "C:\\HashiCorp\\Philance\\Share\\Philance\\my-app\\public", "/opt/openproject/public/philance-app/public"
  config.vm.synced_folder "C:\\HashiCorp\\Philance\\Share\\Philance\\my-app\\src", "/opt/openproject/public/philance-app/src"
  config.vm.provider "virtualbox" do |vb|
       vb.memory = "3072"
  end
  config.trigger.before :destroy do |trigger|
      trigger.warn = "Dumping database to mysql.sql"
      trigger.run_remote = {inline: "/opt/openproject/public/Philance/mysqldump.sh"}
    end
  config.vm.provision "shell", inline: <<-SHELL
      chmod +x /opt/openproject/public/Philance/*.sh
	  chmod +x /opt/openproject/public/Philance/*.py
	  /opt/openproject/public/Philance/hostch.sh
	  /opt/openproject/public/Philance/mysql.sh
	  cd /opt/openproject/public/philance-app;npm start &
  SHELL
end