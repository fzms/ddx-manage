/*
Navicat MySQL Data Transfer

Source Server         : myDB
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : ddx_manage

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2017-08-28 15:49:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for SYSTEM_USER
-- ----------------------------
DROP TABLE IF EXISTS `SYSTEM_USER`;
CREATE TABLE `SYSTEM_USER` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `SU_LOGIN_NAME` varchar(100) NOT NULL COMMENT '登录名',
  `SU_PASSWORD` varchar(100) NOT NULL COMMENT '登录密码',
  `SU_REAL_NAME` varchar(30) DEFAULT NULL COMMENT '真实姓名',
  `SU_MOBILE` varchar(20) DEFAULT NULL COMMENT '手机号',
  `SU_ENCRYPT_SALT` varchar(32) NOT NULL COMMENT 'MD5加盐值',
  `SU_TYPE` char(1) NOT NULL COMMENT '用户类型  0：管理员，  1：普通用户',
  `SU_STATUS` char(1) NOT NULL COMMENT '状态:0异常 1:正常',
  `SU_OPERATOR` varchar(20) DEFAULT NULL COMMENT '操作人',
  `SU_OPERATE_TIME` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统用户表';

-- ----------------------------
-- Records of SYSTEM_USER
-- ----------------------------
INSERT INTO `SYSTEM_USER` VALUES ('E31F6D109AA741099770AD0A1924CF49', 'admin', '26087d4c071b7e97609c7114723050f5', '系统管理员', null, 'f888f4e3b9faec18b9143a80c76ebc06', '0', '1', 'admin', '2017-08-28 14:29:51');
