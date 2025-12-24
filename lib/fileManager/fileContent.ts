import fs from 'fs';
import path from 'path';

const crypto = require('crypto');

interface fileConfig {
    themeID:string,
    domainID:string,
    token:string,
    fileListMap:any,
    language:string,
    curPage:string,
}

// 获取文件内容
export const getFileContent = (name:string,fileConfig:fileConfig) => {
    // 本地环境测试
    if(process.env.NEXT_PUBLIC_MOCK_MODE === 'true'){
        // 读取本地文件
        const snippetsPath = path.join(process.cwd(),'public','project',name);
        const content = fs.readFileSync(snippetsPath, 'utf8');
        return content;
    }
    const fileObj = fileConfig.fileListMap[name];
    // 创建 MD5 哈希对象
    const md5 = crypto.createHash('md5');
    // 根据 主题ID 语言 file_name cdnUrl  更新哈希对象并生成十六进制格式
    const hash = md5.update(`${fileConfig.themeID}${fileConfig.language}${fileObj.file_name}${fileObj.cdn_url}`).digest('hex');
    const filePath = path.join(process.cwd(), 'runtime', 'cache', fileConfig.domainID, hash+'.'+fileObj.file_type);
    let content;
    if (fs.existsSync(filePath)) {
        // ✅ 新增：缓存存在时直接读取文件
        content = fs.readFileSync(filePath, 'utf-8');
    }else{
        // 从CDN下载文件并保存到本地
        console.log(`缺少文件${name}`);
        content = "{}"
    }
    return content;
};