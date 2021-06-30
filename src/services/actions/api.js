// const SERVER = 'http://localhost/';
const SERVER = 'https://ixoraeducation.com/';
// const SERVER = 'http://34.226.204.252/';

//const PREFIX = 'mocktest/api/';
const PREFIX = 'landlordstalk-backend-developer/api/';
// const PREFIX = 'landlordstalk-backend/api/';

export const BASE_URL = SERVER+PREFIX;
export const LOGIN = SERVER + PREFIX + 'login';
export const SOCIAL_LOGIN = SERVER + PREFIX + 'social-login';

export const REGISTER_LANDLORD = SERVER + PREFIX + 'register';
export const NEW_REVIEW = SERVER + PREFIX + 'user/review/action';
export const QUESTION_LIST = SERVER + PREFIX + 'user/question/list';
export const TENANT_REVIEW_SEARCH = SERVER + PREFIX + 'user/tenant-search';
export const USER_CONTACT = SERVER + PREFIX + 'user/contact';
export const SUBSCRIBE_NEWSLETTER = SERVER + PREFIX + 'user/subscribe-newsletter';
export const USER_FORGET_PASSWORD = SERVER + PREFIX + 'user/forget-password';
export const USER_RESET_PASSWORD = SERVER + PREFIX + 'user/reset-password';
export const USER_CHANGE_PASSWORD = SERVER + PREFIX + 'user/change-password';
export const SEND_INITIAL_EMAIL = SERVER + PREFIX + 'user/send-initial-email';



export const BLOG_COMMENT_ADD = SERVER + PREFIX + 'user/add-blog-comment';
export const BLOG_LIST = SERVER + PREFIX + 'user/blog/list';
export const BLOG_DETAIL_API = SERVER + PREFIX + 'user/blog/search';

export const VERIFY_EMAIL = SERVER + PREFIX + 'user/verify-email';


export const UPLAOD_FILE = SERVER + PREFIX + 'user/upload-file';

//admin APIS

export const ADMIN_LOGIN = SERVER + PREFIX + 'admin/login';
export const ADMIN_DASHBOARD = SERVER + PREFIX + 'admin/dashboard';

//contact manager
export const ADMIN_CONTACT_LIST = SERVER + PREFIX + 'admin/contact-manager/search';
export const ADMIN_CONTACT_DELETE = SERVER + PREFIX + 'admin/contact-manager/delete';
export const ADMIN_CONTACT_GET = SERVER + PREFIX + 'admin/contact-manager/id';
    //user manager
export const ADMIN_USER_LIST = SERVER + PREFIX + 'admin/user/search';
export const ADMIN_USER_DELETE = SERVER + PREFIX + 'admin/user/delete';
export const ADMIN_USER_UPDATE = SERVER + PREFIX + 'admin/user/action';
export const ADMIN_USER_GET = SERVER + PREFIX + 'admin/user/id';
    //review manager
export const ADMIN_REVIEW_SEARCH = SERVER + PREFIX + 'admin/review/search';
export const ADMIN_REVIEW_DELETE = SERVER + PREFIX + 'admin/review/delete';
export const ADMIN_REVIEW_UPDATE = SERVER + PREFIX + 'admin/review/update';
export const ADMIN_REVIEW_GET = SERVER + PREFIX + 'admin/review/id';
export const ADMIN_UPDATE_REVIEW_STATUS = SERVER + PREFIX + 'admin/review/status';

export const ADMIN_BLOG_SEARCH = SERVER + PREFIX + 'admin/blog/search';
export const ADMIN_BLOG_ACTION = SERVER + PREFIX + 'admin/blog/action';
export const ADMIN_BLOG_STATUS_CHANGE = SERVER + PREFIX + 'admin/blog/status-change';
export const ADMIN_BLOG_CATEGORY_SEARCH = SERVER + PREFIX + 'admin/blog-category/search';
export const ADMIN_BLOG_DELETE = SERVER + PREFIX + 'admin/blog/delete';
export const ADMIN_BLOG_GET = SERVER + PREFIX + 'admin/blog/get';

export const ADMIN_NOTIFICATION_SEARCH = SERVER + PREFIX + 'notifications/search';
export const NOTIFICATION_COUNT = SERVER + PREFIX + 'get_unread_notification_count';
export const SET_NOTIFICATION_READ = SERVER + PREFIX + 'set_notification_read';

