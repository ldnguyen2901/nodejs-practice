const Course = require('../models/Course');

class MeController {
  //[GET] /me/store/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery.lean(), Course.countDocumentsWithDeleted({ deleted: true })])
      .then(([courses, deletedCount]) => res.render('me/stored-courses', { courses, deletedCount }))
      .catch(next);

    // Course.countDocumentsDeleted()
    //   .lean()
    //   .then((deletedCount) => {
    //     console.log(deletedCount);
    //   })
    //   .catch(next);

    // Course.find({})
    //   .lean()
    //   .then((courses) => res.render('me/stored-courses', { courses }))
    //   .catch(next);
    // // res.render('me/stored-courses');
  }

  //[GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .lean()
      .then((courses) => res.render('me/trash-courses', { courses }))
      .catch(next);
    // res.render('me/stored-courses');
  }
}

module.exports = new MeController();

/*
Việc truy cập dữ liệu gốc từ con đường input được cho là có lỗ hổng bảo mật lớn và đã bị gỡ bỏ , phải thêm 1 bước chuyển đổi dữ liệu để có thể gọi find({}).lean() có thể giải quyết lỗi ko render ra được dữ liệu

".lean() là một phương thức để chuyển đổi kết quả truy vấn từ dạng Mongoose Document sang dạng JavaScript plain object. Việc này giúp tối ưu hóa hiệu suất và giảm bớt tài nguyên."

Cách khắc phục : https://www.npmjs.com/package/@handlebars/allow-prototype-access
Chi tiết về lỗ hổng : https://mahmoudsec.blogspot.com/2019/04/handlebars-template-injection-and-rce.html
*/
