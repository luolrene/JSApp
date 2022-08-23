<template>
    <view class="button-sp-area">
        <button type="primary" plain="true" @click="isSupport()">是否支持蓝牙</button>
        <button type="primary" plain="true" @click="isOpen()">蓝牙是否打开</button>
        <button type="primary" plain="true" @click="openBT()">打开蓝牙</button>
        <button type="primary" plain="true" @click="closeBT()">关闭蓝牙</button>
        <button type="primary" plain="true" @click="bluetoothList()">搜索蓝牙列表</button>
        <button type="primary" plain="true" @click="stopSearch()">停止搜索蓝牙</button>
        <button type="primary" plain="true" @click="listBondedBT()">已经配对列表</button>
        <button type="primary" plain="true" @click="bluetoothConnect()">连接蓝牙</button>
        <button type="primary" plain="true" @click="bluetoothConnectState()">判断蓝牙是否连接</button>
        <button type="primary" plain="true" @click="printText()">打印测试</button>
        <button type="primary" plain="true" @click="breakConnect()">断开连接</button>
    </view>
</template>
<script>
    //弹框,仅仅演示使用
    const modal = uni.requireNativePlugin('modal');
    //打印插件
    const print = uni.requireNativePlugin('Common-Print');
    //打印命令
    var path =
        "! 0 200 200 1680 1\r\n" +
        "B 128 2 2 64 400 0 3100488650709\r\n" +
        "LINE 0 136 800 136 1\r\n" +
        "LINE 0 188 800 188 1\r\n" +
        "LINE 0 240 800 240 1\r\n" +
        "LINE 600 136 600 240 1\r\n" +
        "LINE 48 240 48 345 1\r\n" +
        "TEXT 24 0 464 80 3100488650709\r\n" +
        "TEXT 24 0 16 144 发件网点名\r\n" +
        "TEXT 24 0 608 144 收件地邮编_mo32\r\n" +
        "TEXT 24 0 16 193 收件网点名_mo33\r\n" +
        "TEXT 24 0 608 193 收件地邮编_mo32\r\n" +
        "LINE 0 289 800 289 1\r\n" +
        "LINE 0 345 800 345 1\r\n" +
        "LINE 400 377 800 377 1\r\n" +
        "LINE 0 408 800 408 1\r\n" +
        "LINE 0 500 800 500 1\r\n" +
        "LINE 400 345 400 408 1\r\n" +
        "TEXT 24 0 8 248 寄方\r\n" +
        "TEXT 24 0 8 297 收方\r\n" +
        "TEXT 24 0 56 248 发件人姓名_mo_36]          发件人手机_mo_37] 发件人座机_mo_38]\r\n" +
        "TEXT 24 0 56 272 寄件时间：       年   月   日   时   分\r\n" +
        "TEXT 24 0 56 297 收件人姓名_mo_43]          收件人手机_mo_44] 收件人座机_mo_45]\r\n" +
        "TEXT 24 0 56 321 收件人详细地址_mo_46]\r\n" +
        "TEXT 24 0 8 353 寄托物：订单物品_mo_47]\r\n" +
        "TEXT 24 0 408 353 打印时间：时间_mo_39]\r\n" +
        "TEXT 24 0 408 384 签收时间：       年   月   日   时   分\r\n" +
        "TEXT 24 0 8 416 附加服务：声明价值：订单总全额_mo_52]\r\n" +
        "TEXT 24 0 8 448 备注：卖家备注_mo_53]\r\n" +

        "B 128 2 2 64 400 648 3100488650709\r\n" +
        "LINE 0 744 800 744 1\r\n" +
        "LINE 0 816 800 816 1\r\n" +
        "LINE 0 897 800 897 1\r\n" +
        "LINE 48 744 48 897 1\r\n" +
        "LINE 600 744 600 897 1\r\n" +
        "LINE 0 960 800 960 1\r\n" +
        "LINE 0 1016 800 1016 1\r\n" +
        "LINE 400 968 400 1016 1\r\n" +
        "TEXT 24 0 464 728 3100488650709\r\n" +
        "TEXT 24 0 8 752 寄方\r\n" +
        "TEXT 24 0 8 832 收方\r\n" +
        "TEXT 24 0 608 840 业务类型_mo34\r\n" +
        "TEXT 24 0 56 752 发件人姓名_mo_36]          发件人手机_mo_37] 发件人座机_mo_38]\r\n" +
        "TEXT 24 0 56 776 寄件时间：       年   月   日   时   分\r\n" +
        "TEXT 24 0 56 832 收件人姓名_mo_43]          收件人手机_mo_44] 收件人座机_mo_45]\r\n" +
        "TEXT 24 0 56 856 收件人详细地址_mo_46]\r\n" +
        "TEXT 24 0 8 968 寄托物：订单物品_mo_47]\r\n" +
        "TEXT 24 0 408 968 签收时间：       年   月   日   时   分\r\n" +
        "TEXT 24 0 8 1024 附加服务：声明价值：订单总全额_mo_52]\r\n" +
        "TEXT 24 0 8 1056 备注：卖家备注_mo_53]\r\n" +

        "B 128 2 2 64 400 1120 3100488650709\r\n" +
        "TEXT 24 0 464 1200 3100488650709\r\n" +
        "LINE 0 1216 800 1216 1\r\n" +
        "LINE 0 1288 800 1288 1\r\n" +
        "LINE 0 1369 800 1369 1\r\n" +
        "LINE 48 1216 48 1216 1\r\n" +
        "LINE 600 1216 600 1369 1\r\n" +
        "LINE 0 1432 800 1432 1\r\n" +
        "LINE 0 1488 800 1488 1\r\n" +
        "LINE 400 1440 400 1488 1\r\n" +
        "TEXT 24 0 8 1224 寄方\r\n" +
        "TEXT 24 0 8 1304 收方\r\n" +
        "TEXT 24 0 608 1312 业务类型_mo34\r\n" +
        "TEXT 24 0 56 1224 发件人姓名_mo_36]          发件人手机_mo_37] 发件人座机_mo_38]\r\n" +
        "TEXT 24 0 56 1248 寄件时间：       年   月   日   时   分\r\n" +
        "TEXT 24 0 56 1304 收件人姓名_mo_43]          收件人手机_mo_44] 收件人座机_mo_45]\r\n" +
        "TEXT 24 0 56 1328 收件人详细地址_mo_46]\r\n" +
        "TEXT 24 0 8 1440 寄托物：订单物品_mo_47]\r\n" +
        "TEXT 24 0 408 1440 签收时间：       年   月   日   时   分\r\n" +
        "TEXT 24 0 8 1496 附加服务：声明价值：订单总全额_mo_52]\r\n" +
        "TEXT 24 0 8 1528 备注：卖家备注_mo_53]\r\n" +

        "FORM\r\n" +
        "PRINT\r\n";
    path =
        "! 0 200 200 1060 1\r\n" +
        "EG 33 66 15 20\r\n" +
        "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007FFFF000000FFFFFFFF01E1E003C0001FFFFF000FFFFFC00000000000000000001FFFFEFC0000FFFFFFFF01E1E003C0FE1FFFFF0FEFFFFFC00000000000000000003FFFF9FF00000003E00001E1E003C0FE1E00000FE0C00F800000000000000000003FFFF7FF80000003E00003E1F007C0001E00000001F03F000000000000000000007FFFEFFF80000003E0000FFFFFFFF8001E00000001FC7E00000000000000000000FFFFDFFFC0000007C0000FFFFFFFF8001E00000001FFFC00000000000000000001FFFFBFFFE0000007C00001E1E003C0001E0000000FFFFFC0000000000000000003FFFFBFFFE000FFFFFFFF01E1E003C0041E00000FEFFFFFC0000000000000000003FFFF3FFFF000FFFFFFFF01E1E003C0FE1E00000FEF8783C0000000000000000007FFFE1FFFF800F800000F01E1E003C0FE1E00000FEF87C3C0000000000000000007FFFC0FFFF800F000000F01E1E003C01E1E000001EF87C3C000000000000000000FFFFC07FFFC00F800000F01E1E003C01E1E000001EFFFFFC000000000000000001FFFF807FFFE00F800000F01E1E003C01E1E000001EFFFFFC000000000000000001FFFF003FFFE00F800000F01E1E003C01E1E000001EF87C3C000000000000000003FFFE001FFFF00F000000F01E1E003C01E1E000001EF8783C000000000000000003FFFE000FFFF00FFFFFFFF01E1E003C01E1E000001EFFFFFC000000000000000007FFFC000FFFF80FFFFFFFF01E1E007C01E1E000001EFFFFFC000000000000000007FFF80007FFF80FFFFFFFF01E1E00FC01E1E000001EF87C3C00000000000000000FFFF80003FFFC0F000000F01E1FFFF801E1E000001EF8783C00000000000000000FFFF00003FFFC0F000000F01E1FFFF001E1E000001EF87C3C00000000000000000FFFE00001FFFC0F800000F01E0FFFE001E1E000001EF87C7C00000000000000000FFFE00001FFFE0F800000F01E00000001E1E000001EF87C7800000000000000000FFFC00000FFFC0F000001F01E00000003E1E000003E000000000000000000000007FFC00000FFF80F800003F01E00000003C1E000003E000000000000000000000003FFC000007FF00FFFFFFFE01FFFFFFF87C1FFFFF03FFFFFFE000000000000000004FF8000007FE00FFFFFFFC01FFFFFFF87C1FFFFF07FFFFFFE0000000000000000033F8000003F18000000000000000000040000000040000000000000000000000003E300000000F0000000000000000000000000000000000000000000000000000001FF0000003FE0000000000000000000000000000000000000000000000000000000FFF80007FFE0000000000000000000000000000000000000000000000000000000FFFE000FFFC00000000000000000000000000000000000000000000000000000007FFF001FFF800000000000000000000000000000000000000000000000000000003FFF807FFF0006801281C0718007F08081807C027C0E00F00000000000000000001FFFC0FFFF000FF0FF87F0FFC00FF8C18FF8FF87FC3F83F80000000000000000001FFFE1FFFE000C18C006180C000C00630C18C0C60030C30C0000000000000000000FFFFBFFFC000C18C00C080C000C00370C0CC0C60060420400000000000000000007FFFBFFFC000C18C006000C000C003E0C0CC0C60030030000000000000000000007FFF1FFF8000FF0FF83E00C000FF01C0C18FFC7FC3F01F000000000000000000003FFE0FFF0000FF8FF80F80C000FF01C0FF0FF07FC07C07C00000000000000000001FFC07FF1800C18C0001C0C000C003E0C00C3060000E00E00000000000000000001FF803FE0940C0CC00C0C0C000C00770C00C1860060660600000000000000000000FF001FC09C0C18C00E0C0C000C00638C00C1C600706706000000000000000000003E000F80000FF8FFC7F80C000FF8C18C00C0E7FE3FC3FC00000000000000000000000000000007E07FC1F008000FF980CC004063FC1F80F8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\r\n" +

        "PAGE - WIDTH 576\r\n" +

        "SETMAG 2 2\r\n" +
        "TEXT 8 0 380 8 快递包裹\r\n" +

        "SETMAG 1 1\r\n" +
        "TEXT 8 0 10 100 2020年9月21日11:09:49\r\n" +
        "TEXT 8 0 270 100 第1/1个\r\n" +

        //条形码
        "BARCODE-TEXT 7 0 5\r\n" +
        "BARCODE 128 1 3 100 130 130 1106745891514\r\n" +
        "BARCODE-TEXT OFF\r\n" +

        // 大方框
        "BOX 1 270 580 830 2\r\n" +

        "SETMAG 3 3\r\n" +
        "TEXT 8 0 80 290 深圳123A45\r\n" +
        "SETMAG 1 1\r\n" +

        "LINE 1 380 580 380 2\r\n" +

        // ---集字方框
        "BOX 10 390 70 455 5\r\n" +
        "SETMAG 2 2\r\n" +
        "TEXT 8 0 17 400 集\r\n" +

        "SETMAG 3 3\r\n" +
        "TEXT 8 0 90 385 深圳\r\n" +
        "SETMAG 1 1\r\n" +
        "LINE 1 460 580 460 2\r\n" +

        // 收字图标
        "EG 9 79 10 505 00000003FFC00000000000007FFFFC000000000003FFFFFF80000000000FFFFFFFE0000000003FFFFFFFF800000000FFFFFFFFFE00000001FFFFFFFFFF80000007FFFFFFFFFFC000000FFFF8003FFFE000001FFFC00007FFF000003FFE000000FFF800007FFC0000003FFC0000FFF00000001FFE0001FFE0380E000FFF0001FFC0381E0003FF0003FF80381C0001FF8007FF00381C0000FFC007FE1838380000FFC007FC1C383800007FE00FF81C387FFFF83FE00FF81C387FFFF83FE01FF01C38FFFFF01FF01FF01C38F007001FF01FF01C39F007000FF01FE01C39F007000FF83FE01C3BF007000FF83FE01C3BB807000FF83FE01C3B380F000FF83FE01C38380E000FF83FE01C381C0E0007F83FE01C381C1E000FF83FE01C381E1C000FF83FE01C780E3C000FF81FE01FF80F38000FF81FE01FF807F8000FF01FF03F3803F0000FF01FF03C3801E0001FF00FF0183803F0001FE00FF8003807FC003FE007F800381F3F003FC007FC00387E1FC07FC003FE0039F807F87F8003FE003BF001F8FF8001FF003BC00071FF0001FF8011000003FF0000FFC000000007FE00007FF00000000FFE00007FF80000003FFC00003FFE0000007FF800001FFF800003FFF800001FFFF0000FFFF000000FFFFF01FFFFE0000007FFFFFFFFFFE0000007FFFFFFFFFFC0000003FFFFFFFFFF80000001FFFFFFFFFF00000000FFFFFFFFFF00000000FFFFFFFFFE000000007FFFFFFFFC000000003FFFFFFFF8000000001FFFFFFFF0000000000FFFFFFFF0000000000FFFFFFFE00000000007FFFFFFC00000000003FFFFFF800000000001FFFFFF000000000000FFFFFE0000000000007FFFFC0000000000003FFFFC0000000000003FFFF80000000000001FFFF00000000000000FFFE000000000000007FFC000000000000003FF8000000000000001FF0000000000000000FE00000000000000007C00000000000000003800000000000000001000000000\r\n" +

        "TEXT 8 0 80 480 金xx 13800139000\r\n" +
        "SETMAG 1 1\r\n" +
        "TEXT 8 0 80 510 科技南十二路金蝶软件园A栋\r\n" +
        "TEXT 8 0 80 540 软件（换行）\r\n" +
        "TEXT 8 0 80 570 园A栋（换行）\r\n" +

        "LINE 1 650 580 650 2\r\n" +

        // 反转变黑
        "SETMAG 2 2\r\n" +
        "TEXT 8 0 20 670 寄\r\n" +
        "SETMAG 1 1\r\n" +
        "TEXT 8 0 20 730 白小递\r\n" +
        "TEXT 8 0 20 760 138 0013 8000\r\n" +

        "LINE 250 650 250 830 2\r\n" +
        "LINE 405 680 405 830 2\r\n" +
        "LINE 1 830 580 830 2\r\n" +

        // 二维码
        "BARCODE QR 255 675 M 2 U 7\r\n" +
        "MA,1106745891514\r\n" +
        "ENDQR\r\n" +

        "LINE 405 740 580 740 2\r\n" +

        "SETMAG 1 1\r\n" +
        "TEXT 8 0 415 660 已验视\r\n" +
        "TEXT 8 0 415 750 签字栏\r\n" +

        "TEXT 8 0 10 840 文件一件\r\n" +
        "TEXT 8 0 470 930 已验视\r\n" +

        "PRINT\r\n";
    export default {
        data() {
            return {
                title: ''
            }
        },
        onLoad() {

        },
        methods: {
            isSupport() {
                print.isSupport(result => {
                    //result数据：{"status":true} 
                    const msg = JSON.stringify(result);
                    console.log(msg);
                    console.log('是否支持蓝牙：' + result.status);
                    modal.toast({
                        message: msg,
                        duration: 1.5
                    });
                });
            },
            isOpen() {
                print.isOpen(result => {
                    //result数据：{"status":true} 
                    const msg = JSON.stringify(result);
                    console.log(msg);
                    console.log('蓝牙是否打开：' + result.status);
                    modal.toast({
                        message: msg,
                        duration: 1.5
                    });
                });
            },
            openBT() {
                print.openBT(result => {
                    //result数据：{"status":true} 
                    const msg = JSON.stringify(result);
                    console.log(msg);
                    console.log('开启蓝牙是否成功：' + result.status);
                    modal.toast({
                        message: msg,
                        duration: 1.5
                    });
                });
            },
            closeBT() {
                print.closeBT(result => {
                    //result数据：{"status":true} 
                    const msg = JSON.stringify(result);
                    console.log(msg);
                    console.log('蓝牙是否关闭：' + result.status);
                    modal.toast({
                        message: msg,
                        duration: 1.5
                    });
                });
            },
            //搜索蓝牙设备列表
            bluetoothList() {
                modal.toast({
                    message: '开始搜索蓝牙，请勿重复点击',
                    duration: 1.5
                });
                print.bluetoothList({}, result => {
                    const msg = JSON.stringify(result);
                    console.log(msg)
                    modal.toast({
                        message: msg,
                        duration: 1.5
                    });
                });
            },
            stopSearch() {
                print.stopSearch(result => {
                    //result数据：{"status":true} 
                    const msg = JSON.stringify(result);
                    console.log(msg);                   
                    modal.toast({
                        message: msg,
                        duration: 1.5
                    });
                });
            },
            listBondedBT() {
                print.listBondedBT(result => {
                    //result数据：{"msg":"搜索完成","list":[{"name":"蓝牙名称","address":"mac地址","status":"配对状态"}]} 
                    const msg = JSON.stringify(result);
                    console.log(msg);
                    console.log('已配对列表：' + result.list);
                    modal.toast({
                        message: msg,
                        duration: 1.5
                    });
                });
            },
            //连接蓝牙
            bluetoothConnect() {
                modal.toast({
                    message: '开始连接蓝牙，请勿重复点击',
                    duration: 1.5
                });
                print.bluetoothConnect({
                    btAddress: 'E1:D5:05:03:23:09',
                    btName: 'B3S-D505032309',
										
										// btAddress: 'C1:D5:05:03:23:09',
										// btName:'B3S-D505032309'
                }, result => {
                    const msg = JSON.stringify(result);
                    console.log(msg)
                    modal.toast({
                        message: msg,
                        duration: 1.5
                    });
                });
            },
            //判断蓝牙是否连接
            bluetoothConnectState() {
                print.bluetoothConnectState({
                    btAddress: 'E1:D5:05:03:23:09'
                }, result => {
                    const msg = JSON.stringify(result);
                    console.log(msg)
                    modal.toast({
                        message: msg,
                        duration: 1.5
                    });
                });
            },
            //打印数据
            printText() {
                print.bluetoothPrint({
                    content: path
                }, result => {
                    const msg = JSON.stringify(result);
                    console.log(msg)
                    modal.toast({
                        message: msg,
                        duration: 1.5
                    });
                });
            },          
            breakConnect() {
                print.breakConnect(result => {
                    //result数据：{"status":true} 
                    const msg = JSON.stringify(result);
                    console.log(msg);
                    modal.toast({
                        message: msg,
                        duration: 1.5
                    });
                });
            }
        }
    }
</script>

<style>
    button {
        margin-top: 30upx;
        margin-bottom: 30upx;
    }

    .button-sp-area {
        margin: 0 auto;
        width: 60%;
    }

    .content {
        text-align: center;
        height: 400upx;
    }

    .wrapper {
        flex-direction: column;
        justify-content: center;
    }

    .button {
        width: 200px;
        margin-top: 30px;
        margin-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-width: 2px;
        border-style: solid;
        border-color: #458B00;
        background-color: #458B00;
    }

    .text {
        font-size: 30px;
        color: #666666;
        text-align: center;
    }
</style>