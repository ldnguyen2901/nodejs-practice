const Course = require('../models/Course');

class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        // res.send('Course Detail... ' + req.params.slug);
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => {
                res.render('courses/show', { course });
            })
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /courses/store
    store(req, res, next) {
        // res.json(req.body)
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch(next);
    }
}

module.exports = new CourseController();

/*
Việc truy cập dữ liệu gốc từ con đường input được cho là có lỗ hổng bảo mật lớn và đã bị gỡ bỏ , phải thêm 1 bước chuyển đổi dữ liệu để có thể gọi find({}).lean() có thể giải quyết lỗi ko render ra được dữ liệu

".lean() là một phương thức để chuyển đổi kết quả truy vấn từ dạng Mongoose Document sang dạng JavaScript plain object. Việc này giúp tối ưu hóa hiệu suất và giảm bớt tài nguyên."

Cách khắc phục : https://www.npmjs.com/package/@handlebars/allow-prototype-access
Chi tiết về lỗ hổng : https://mahmoudsec.blogspot.com/2019/04/handlebars-template-injection-and-rce.html
*/
