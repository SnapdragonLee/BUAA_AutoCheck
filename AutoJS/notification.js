importClass("android.app.NotificationManager");
importClass("android.app.Notification");
importClass("android.app.PendingIntent");
importClass("android.content.res.Resources");
importClass("android.app.PendingIntent");


module.exports = {
    send(title,content,ticker){

        let channel_id = 'channel_id';
        var manager = context.getSystemService(android.app.Service.NOTIFICATION_SERVICE);
        var notification;
	//设置图标
        var icon = context.getResources().getIdentifier("ic_3d_rotation_black_48dp", "drawable", context.getPackageName());
	//构造Intent 用于点击跳转
        let contentIntent = PendingIntent.getActivity(context, 0,  app.intent({
            packageName: currentPackage(),
            className: currentActivity()
        }), 0);
        
        if (device.sdkInt >= 26) {
            var channel = new android.app.NotificationChannel(channel_id, title?title:"通知测试", android.app.NotificationManager.IMPORTANCE_DEFAULT);
            channel.enableLights(true);
            channel.setLightColor(0xff0000);
            channel.setShowBadge(false);
            manager.createNotificationChannel(channel);
            notification = new android.app.Notification.Builder(context, channel_id)
                .setContentTitle(title || '')
                .setContentText(content || '')
                .setWhen((new Date()).getTime())
                .setSmallIcon(icon)
                .setTicker(ticker || '')
                .setOngoing(false) // 不可被取消
                .setShowWhen(true) // 显示时间
                .setContentIntent(contentIntent); // 设置刚刚构造的Intent
        } else {
            notification = new android.app.Notification.Builder(context)
                .setContentTitle(title || '')
                .setContentText(content || '')
                .setWhen((new Date()).getTime())
                .setSmallIcon(icon)
                .setTicker(ticker || '');
        }
        manager.notify(1, notification.build());
        return {
            'manager':manager,
            'notification_builder':notification
        };
    },
    cancel(){
        var manager = context.getSystemService(android.app.Service.NOTIFICATION_SERVICE);
        manager.cancelAll();
    },
    
}