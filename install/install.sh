#!/bin/sh
WHOAMI="$(whoami)"
echo "${WHOAMI}"

UNAME="$(uname -a)"
echo "${UNAME}"

OS="UNKNOWN"

GCCVERSION="$(gcc --version)"
echo "${GCCVERSION}"

if [[ $UNAME == *"Darwin"* ]]; then
    echo "Installing for Mac";
    OS="MAC";
    
    #TODO: Need to be able to reboot from within Node
    #?? sudo setcap CAP_SYS_BOOT=+ep /usr/local/bin/node

elif [[ $UNAME == *"Linux"* ]]; then
    echo "Installing for Linux";

    OS="LINUX";

    LINUXVERSION="$(lsb_release -a)"
    echo "${LINUXVERSION}"

    #Need to be able to reboot from within Node
    echo "Modifying sudoers file /etc/sudoers.d/pi to allow commands to run from api."
    #sudo setcap CAP_SYS_BOOT=+ep /usr/local/bin/node
    sudo cat >> filename /etc/sudoers.d/pi "pi ALL=/sbin/shutdown" + "\n" + "pi ALL=NOPASSWD: /sbin/shutdown"
    sudo cat >> filename /etc/sudoers.d/pi "pi ALL=/etc/init.d/networking" + "\n" + "pi ALL=NOPASSWD: /etc/init.d/networking"


    apt-get update # To get the latest package lists
    apt-get upgrade

    apt-get install avahi-utils
    apt-get install libavahi-compat-libdnssd-dev -y

    CPUINFO="${cat /proc/cpuinfo}"

    #http://elinux.org/RPi_HardwareHistory
    
    #HARDWARE="PI"
    if [[ $CPUINFO == *"Hardware	: BCM2708"* ]]
        || [[ $CPUINFO == *"Hardware	: BCM2708"* ]]
        ; then

        echo "Hardware is ARM"

        if 
            # HARDWAREVERSION = "B256";
            [[ $CPUINFO == *"Revision	: 0002"* ]]
            || [[ $CPUINFO == *"Revision	: 0003"* ]]
            || [[ $CPUINFO == *"Revision	: 0004"* ]]
            || [[ $CPUINFO == *"Revision	: 0005"* ]]
            || [[ $CPUINFO == *"Revision	: 0006"* ]]
           
            # HARDWAREVERSION = "A256";
            || [[ $CPUINFO == *"Revision	: 0007"* ]]
            || [[ $CPUINFO == *"Revision	: 0008"* ]]
            || [[ $CPUINFO == *"Revision	: 0009"* ]]
           
            # HARDWAREVERSION = "B512";
            || [[ $CPUINFO == *"Revision	: 000d"* ]]
            || [[ $CPUINFO == *"Revision	: 000e"* ]]
            || [[ $CPUINFO == *"Revision	: 000f"* ]]
           
            # HARDWAREVERSION = "BP512";
            || [[ $CPUINFO == *"Revision	: 0010"* ]]
            
            # HARDWAREVERSION = "CM512";
            || [[ $CPUINFO == *"Revision	: 0011"* ]]; then
            
            # HARDWAREVERSION = "AP512";
            || [[ $CPUINFO == *"Revision	: 0012"* ]]
            || [[ $CPUINFO == *"Revision	: 0012"* ]]
            
            # HARDWAREVERSION = "BP512";
            || [[ $CPUINFO == *"Revision	: 0013"* ]]

            # HARDWAREVERSION = "CM512";
            || [[ $CPUINFO == *"Revision	: 0014"* ]]

            # HARDWAREVERSION = "CM256";
            || [[ $CPUINFO == *"Revision	: 0015"* ]]

            ; then
            echo "ARMv6 Found"

            wget https://nodejs.org/dist/v4.2.1/node-v4.2.1-linux-armv6l.tar.gz 
            tar -xvf node-v4.2.1-linux-armv6l.tar.gz 
            cd node-v4.2.1-linux-armv6l
            sudo cp -R * /usr/local/

        # HARDWAREVERSION = "2B1024";
        elif [[ $CPUINFO == *"Revision	: a01040"* ]]
            || [[ $CPUINFO == *"Revision	: a01041"* ]]
            || [[ $CPUINFO == *"Revision	: a21041"* ]]
            || [[ $CPUINFO == *"Revision	: a22042"* ]]
           
            # HARDWAREVERSION = "Z512";
            || [[ $CPUINFO == *"Revision	: 900092"* ]]
            || [[ $CPUINFO == *"Revision	: 900093"* ]]
            
            #  HARDWAREVERSION = "3B1024";
            || [[ $CPUINFO == *"Revision	: a02082"* ]]
            || [[ $CPUINFO == *"Revision	: a22082"* ]]
            ; then
           
            echo "ARMv7 Found"
            
            #wget https://nodejs.org/dist/v4.2.1/node-v4.2.1-linux-armv7l.tar.gz 
            #tar -xvf node-v4.2.1-linux-armv7l.tar.gz 
            #cd node-v4.2.1-linux-armv7l
            #sudo cp -R * /usr/local/

            sudo apt-get install curl
            curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
            sudo apt-get install --yes nodejs
        fi
    fi
fi


npm install -g homebridge --unsafe-perm

#start homebridge
homebridge