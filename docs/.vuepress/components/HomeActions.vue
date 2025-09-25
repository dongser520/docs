<template>
    <div class="action-buttons">
      <a href="/aboutless" class="action-button outline">查看课程文档</a>
      <!--<a href="http://192.168.2.6:8081/#/pages/case/case" class="action-button solid">在线咨询老师</a>-->
      <a href="https://study.163.com/provider/480000002289674/index.htm?share=2&shareId=480000002289674" 
      class="action-button outline" target="_blank">查看课程视频</a>
    </div>
  </template>
  
  <style scoped>
  .action-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  
  .action-button {
    display: inline-block;
    padding: 0.8rem 1.6rem;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s;
    font-weight: 500;
    font-size: 1rem;
    border: 2px solid; /* 统一边框样式 */
  }
  
  /* 第一个链接样式 - 边框色，背景透明 */
  .action-button.outline {
    background-color: transparent;
    border-color: #3eaf7c; /* 直接使用颜色值 */
    color: #3eaf7c;
  }
  
  .action-button.outline:hover {
    background-color: #3eaf7c;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* 第二个链接样式 - 背景色 */
  .action-button.solid {
    background-color: #3eaf7c;
    border-color: #3eaf7c;
    color: white;
  }
  
  .action-button.solid:hover {
    background-color: transparent;
    color: #3eaf7c;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>