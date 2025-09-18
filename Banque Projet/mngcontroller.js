import { renderUserInfo } from "./static/Views/mngAccView";
import { userInfos } from "./static/model";

renderUserInfo(await userInfos());
console.log(await userInfos());
