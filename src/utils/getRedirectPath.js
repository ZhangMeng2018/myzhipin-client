export default function getRedirectPath(type,header) {
  let path = '';
  // 根据type得到path
  path += type==='laoban' ? '/laoban' : '/dashen';
  // 如果没有头像添加info
  path += !header ? "info" : '';

  return path
}