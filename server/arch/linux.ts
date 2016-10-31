class Linux implements IArch {
    Reboot()
    {
        require('child_process')
            .exec('sudo /sbin/shutdown -r now', function (msg) {
                console.log(msg)
        });

        return true
    }

    IsHomeBridgeRunning()
    {
        return true;
    }
}