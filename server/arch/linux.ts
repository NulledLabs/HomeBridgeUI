class Linux implements Arch {
    Reboot()
    {
        require('child_process')
            .exec('sudo /sbin/shutdown -r now', function (msg) {
                console.log(msg)
        });

        return true
    }
}