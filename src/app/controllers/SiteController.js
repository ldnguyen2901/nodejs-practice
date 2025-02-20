const Course = require('../models/Course');

class SiteController {
    //GET /
    async index(req, res, next) {
        // try {
        //     const courses = await Course.find({});
        //     res.json(courses);
        // } catch (err) {
        //     res.status(400).json({ error: 'error!' });
        // }
        Course.find({})
            .lean()
            .then((courses) => res.render('home', { courses }))
            .catch(next);
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();

/*
Việc truy cập dữ liệu gốc từ con đường input được cho là có lỗ hổng bảo mật lớn và đã bị gỡ bỏ , phải thêm 1 bước chuyển đổi dữ liệu để có thể gọi find({}).lean() có thể giải quyết lỗi ko render ra được dữ liệu

".lean() là một phương thức để chuyển đổi kết quả truy vấn từ dạng Mongoose Document sang dạng JavaScript plain object. Việc này giúp tối ưu hóa hiệu suất và giảm bớt tài nguyên."

Cách khắc phục : https://www.npmjs.com/package/@handlebars/allow-prototype-access
Chi tiết về lỗ hổng : https://mahmoudsec.blogspot.com/2019/04/handlebars-template-injection-and-rce.html
*/
