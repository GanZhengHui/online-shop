import { v4 as uuidv4 } from 'uuid'
// 要生成一个随机字符串， 每次执行不能发生变化，游客身份持久化
export const getUUID = () => {
    // 先看看本地存储有么有uuid
    let uuid_token = localStorage.getItem('UUIDTAKEN')
        // 如果没有，则生成一次uuid
    if (!uuid_token) {
        uuid_token = uuidv4()
            // 存储在本地
        localStorage.setItem('UUIDTAKEN', uuid_token)
    }
    return uuid_token
}