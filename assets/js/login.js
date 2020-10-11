$(function () {
    /* 去注册账号 */
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    /* 去登录 */
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        /* 校验两次密码是否一致 */
        repwd: function (value) {
            /* 通过形参拿到的是确认密码框的内容 */
            /* 还要拿到密码框的内容 */
            /* 然后进行一次等于判断 */
            /* 如果判断失败,则return一个提示消息 */
            var pwd = $('.reg-box[name=password]')
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })

    /* 监听注册表单的提交事件 */
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = { username: $('#form_reg[name=username].val'), password: $('#form_reg[name=password].val') };
        $.post('/api/reguser', data, function (res) {
            if ('res.status !== 0') {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录!');
            $('#link_login').click();
        })
    })
    /* 监听登录表单的提交事件 */

    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！');
                /* 将登录成功后的token字符串保存到localStorage里面 */
                localStorage.setItem('token', res.token);

                /* 跳转到后台主页 */
                location.href = '/index.html';
            }
        })
    })
})
