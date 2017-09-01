/*
Navicat MySQL Data Transfer

Source Server         : myDB
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : ddx_manage

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2017-09-01 15:42:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for DM_CALL_BACK_RECORD
-- ----------------------------
DROP TABLE IF EXISTS `DM_CALL_BACK_RECORD`;
CREATE TABLE `DM_CALL_BACK_RECORD` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `CBR_ORDER_ID` varchar(32) NOT NULL COMMENT '订单ID',
  `CBR_PRE_TIME` datetime NOT NULL COMMENT '预计d电话回访日期',
  `CBR_ACT_TIME` datetime DEFAULT NULL COMMENT '实际回访日期',
  `CBR_STAFF_NAME` varchar(50) DEFAULT NULL COMMENT '回访员工姓名',
  `CBR_REMARK` varchar(255) DEFAULT NULL COMMENT '回访记录备注',
  `CBR_OPERATOR` varchar(32) DEFAULT NULL COMMENT '操作人',
  `CBR_OPERATE_TIME` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='电话回访记录表';

-- ----------------------------
-- Table structure for DM_CUSTOMER
-- ----------------------------
DROP TABLE IF EXISTS `DM_CUSTOMER`;
CREATE TABLE `DM_CUSTOMER` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `DC_NAME` varchar(50) NOT NULL COMMENT '姓名',
  `DC_SEX` char(1) DEFAULT NULL COMMENT '性别（0：未知，1：男，2：女）',
  `DC_ID_NUMBER` varchar(18) DEFAULT NULL COMMENT '身份证号',
  `DC_AGE` int(5) DEFAULT NULL COMMENT '年龄',
  `DC_EMAIL` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `DC_PHONE` varchar(50) NOT NULL COMMENT '手机号',
  `DC_TELEPHONE` varchar(50) DEFAULT NULL COMMENT '固定电话',
  `DC_ADDRESS` varchar(255) DEFAULT NULL COMMENT '联系地址',
  `DC_TYPE` char(1) NOT NULL COMMENT '客户类型（1:代理商，2:公司，3:个人）',
  `DC_BANK_ACCOUNT` varchar(100) NOT NULL COMMENT '银行账户',
  `DC_OPENING_BANK` varchar(50) NOT NULL COMMENT '开户行',
  `DC_ACCOUNT_HOLDER` varchar(50) NOT NULL COMMENT '银行账号开户人',
  `DC_SOURCE` varchar(100) DEFAULT NULL COMMENT '客户来源',
  `DC_PRIORITY` char(2) NOT NULL COMMENT '客户优先级（1:低，2:中，3:高，4:特高）',
  `DC_CREATOR` varchar(32) DEFAULT NULL COMMENT '创建人',
  `DC_CREATE_TIME` datetime DEFAULT NULL COMMENT '创建时间',
  `DC_OPERATOR` varchar(32) DEFAULT NULL COMMENT '操作人',
  `DC_OPERATE_TIME` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户表';

-- ----------------------------
-- Table structure for DM_EMPLOYEE
-- ----------------------------
DROP TABLE IF EXISTS `DM_EMPLOYEE`;
CREATE TABLE `DM_EMPLOYEE` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `DE_CODE` varchar(100) DEFAULT NULL COMMENT '员工编号',
  `DE_NAME` varchar(50) DEFAULT NULL COMMENT '员工姓名',
  `DE_PHONE` varchar(50) DEFAULT NULL COMMENT '手机号',
  `DE_SEX` char(1) DEFAULT NULL COMMENT '性别（0：未知，1：男，2：女）',
  `DE_DEPARTMENT` varchar(100) DEFAULT NULL COMMENT '所属部门',
  `DE_POST` varchar(100) DEFAULT NULL COMMENT '岗位',
  `DE_ENTRY_TIME` datetime DEFAULT NULL COMMENT '入职时间',
  `DE_NATIVE_PLACE` varchar(100) DEFAULT NULL COMMENT '籍贯',
  `DE_LIVING_ADDRESS` varchar(255) DEFAULT NULL COMMENT '现居住地址',
  `DE_ID_NUMBER` varchar(18) DEFAULT NULL COMMENT '身份证号',
  `DE_BIRTH_DATE` date DEFAULT NULL COMMENT '出生日期',
  `DE_EDUCATION` varchar(20) DEFAULT NULL COMMENT '学历',
  `DE_GRADUATED_SCHOOL` varchar(100) DEFAULT NULL COMMENT '毕业院校',
  `DE_GRADUATED_DATE` date DEFAULT NULL COMMENT '毕业时间',
  `DE_
DE_PHOTO_URL` varchar(255) DEFAULT NULL COMMENT '照片地址',
  `DE_EMAIL` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `DE_MARITAL_STATUS` char(1) DEFAULT NULL COMMENT '婚姻状况（0:未婚，1:已婚）',
  `DE_STATUS` char(1) DEFAULT NULL COMMENT '状态（0:在职，1:离职）',
  `DE_OPERATOR` varchar(32) DEFAULT NULL COMMENT '操作人',
  `DE_OPERATE_TIME` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for DM_MATERIAL
-- ----------------------------
DROP TABLE IF EXISTS `DM_MATERIAL`;
CREATE TABLE `DM_MATERIAL` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `DM_NAME` varchar(100) DEFAULT NULL COMMENT '材料名称',
  `DM_DESCRIBE` varchar(255) DEFAULT NULL COMMENT '材料说明',
  `DM_STOCK_AMOUNT` decimal(10,0) DEFAULT NULL COMMENT '库存量',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='原材料表';

-- ----------------------------
-- Table structure for DM_MATERIAL_IN_OUT_STORAGE
-- ----------------------------
DROP TABLE IF EXISTS `DM_MATERIAL_IN_OUT_STORAGE`;
CREATE TABLE `DM_MATERIAL_IN_OUT_STORAGE` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `IOS_MATERIAL_ID` varchar(32) DEFAULT NULL COMMENT '材料ID',
  `IOS_TYPE` char(1) DEFAULT NULL COMMENT '类型（1:入库，2:出库）',
  `IOS_AMOUNT` int(11) DEFAULT NULL COMMENT '数量',
  `IOS_RECORD_TIME` datetime DEFAULT NULL COMMENT '记录时间',
  `IOS_REMARK` varchar(255) DEFAULT NULL COMMENT '备注',
  `IOS_OPERATOR` varchar(32) DEFAULT NULL COMMENT '操作人',
  `IOS_OPERATE_TIME` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for DM_ORDER
-- ----------------------------
DROP TABLE IF EXISTS `DM_ORDER`;
CREATE TABLE `DM_ORDER` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `DO_CUSTOMER_ID` varchar(32) DEFAULT NULL COMMENT '客户ID',
  `DO_ORDER_NUMBER` varchar(50) DEFAULT NULL COMMENT '订单编号',
  `DO_TOTAL_PRICE` decimal(10,0) DEFAULT NULL COMMENT '订单总价',
  `DO_DISCOUNT_PRICE` decimal(10,0) DEFAULT NULL COMMENT '优惠后价格',
  `DO_ORDER_TIME` datetime DEFAULT NULL COMMENT '下单时间',
  `DO_PRE_FINISH_TIME` datetime DEFAULT NULL COMMENT '预计完成时间',
  `DO_ACT_FINISH_TIME` datetime DEFAULT NULL COMMENT '实际完成时间',
  `DO_PAYMENT_STATUS` char(1) DEFAULT NULL COMMENT '付款状态（0:未付款，1:已付定金，2:已付款）',
  `DO_STATUS` char(1) DEFAULT NULL COMMENT '订单状态（0:未完成，1:已完成， 2:已发货，3:已收货）',
  `DO_INVOICE_NUMBER` varchar(50) DEFAULT NULL COMMENT '发票税号',
  `DO_CREATOR` varchar(32) DEFAULT NULL COMMENT '创建人',
  `DO_CREATE_TIME` datetime DEFAULT NULL COMMENT '创建时间',
  `DO_OPERATOR` varchar(32) DEFAULT NULL COMMENT '操作人',
  `DO_OPERATE_TIME` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单表';

-- ----------------------------
-- Table structure for DM_ORDER_DETAIL
-- ----------------------------
DROP TABLE IF EXISTS `DM_ORDER_DETAIL`;
CREATE TABLE `DM_ORDER_DETAIL` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `OD_ORDER_ID` varchar(32) NOT NULL COMMENT '订单ID',
  `OD_PRODUCT_ID` varchar(32) NOT NULL COMMENT '产品ID',
  `OD_PRODUCT_NAME` varchar(100) DEFAULT NULL COMMENT '产品名称',
  `OD_AMOUNT` int(11) DEFAULT NULL COMMENT '数量',
  `OD_UNIT_PRICE` decimal(10,0) DEFAULT NULL COMMENT '单价',
  `OD_ACT_UNIT_PRICE` decimal(10,0) DEFAULT NULL COMMENT '实际单价',
  `OD_FINISH_STATUS` char(1) DEFAULT NULL COMMENT '完成状态（0:未完成，1:已完成）',
  `OD_CREATOR` varchar(32) DEFAULT NULL COMMENT '创建人',
  `OD_CREATE_TIME` datetime DEFAULT NULL COMMENT '创建时间',
  `OD_OPERATOR` varchar(32) DEFAULT NULL COMMENT '操作人',
  `OD_OPERATE_TIME` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单详情表';

-- ----------------------------
-- Table structure for DM_PRODUCT
-- ----------------------------
DROP TABLE IF EXISTS `DM_PRODUCT`;
CREATE TABLE `DM_PRODUCT` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `DP_PRO_CODE` varchar(50) DEFAULT NULL COMMENT '产品编号',
  `DP_PRO_NAME` varchar(100) DEFAULT NULL COMMENT '产品名称',
  `DP_CATEGORY_ID` varchar(32) DEFAULT NULL COMMENT '所属类别ID',
  `DP_LONG` decimal(10,0) DEFAULT NULL COMMENT '规格：长',
  `DP_WIDTH` decimal(10,0) DEFAULT NULL COMMENT '规格：宽',
  `DP_HIGHT` decimal(10,0) DEFAULT NULL COMMENT '规格：高',
  `DP_STOCK_AMOUNT` decimal(10,0) DEFAULT NULL COMMENT '库存量',
  `DP_COST_PRICE` decimal(10,0) DEFAULT NULL COMMENT '成本价',
  `DP_SELL_PRICE` decimal(10,0) DEFAULT NULL COMMENT '售价',
  `DP_DESCRIBE` varchar(255) DEFAULT NULL COMMENT '产品描述',
  `DP_IMAGE_URL` varchar(255) DEFAULT NULL COMMENT '产品图片地址',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='产品表';

-- ----------------------------
-- Table structure for DM_PRODUCT_CATEGORY
-- ----------------------------
DROP TABLE IF EXISTS `DM_PRODUCT_CATEGORY`;
CREATE TABLE `DM_PRODUCT_CATEGORY` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `PC_CODE` varchar(50) DEFAULT NULL COMMENT '类别编码',
  `PC_NAME` varchar(100) DEFAULT NULL COMMENT '类别名称',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='产品类别表';

-- ----------------------------
-- Table structure for DM_PRODUCT_IN_OUT_STORAGE
-- ----------------------------
DROP TABLE IF EXISTS `DM_PRODUCT_IN_OUT_STORAGE`;
CREATE TABLE `DM_PRODUCT_IN_OUT_STORAGE` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `IOS_PRODUCT_ID` varchar(32) DEFAULT NULL COMMENT '产品ID',
  `IOS_TYPE` char(1) DEFAULT NULL COMMENT '类型（1:入库，2:出库）',
  `IOS_AMOUNT` int(11) DEFAULT NULL COMMENT '数量',
  `IOS_RECORD_TIME` datetime DEFAULT NULL COMMENT '记录时间',
  `IOS_REMARK` varchar(255) DEFAULT NULL COMMENT '备注',
  `IOS_OPERATOR` varchar(32) DEFAULT NULL COMMENT '操作人',
  `IOS_OPERATE_TIME` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='产品入库出库表';

-- ----------------------------
-- Table structure for DM_PRODUCT_USE_MATERIAL
-- ----------------------------
DROP TABLE IF EXISTS `DM_PRODUCT_USE_MATERIAL`;
CREATE TABLE `DM_PRODUCT_USE_MATERIAL` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `PUM_PRODUCT_ID` varchar(32) DEFAULT NULL COMMENT '产品ID',
  `PUM_MATERIAL_ID` varchar(32) DEFAULT NULL COMMENT '材料ID',
  `PUM_AMOUNT` decimal(10,0) DEFAULT NULL COMMENT '数量',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='产品所需原材料表';

-- ----------------------------
-- Table structure for DM_TOOL
-- ----------------------------
DROP TABLE IF EXISTS `DM_TOOL`;
CREATE TABLE `DM_TOOL` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `DT_NAME` varchar(100) DEFAULT NULL COMMENT '工具名称',
  `DT_STOCK_AMOUNT` decimal(10,0) DEFAULT NULL COMMENT '库存量',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工具表';

-- ----------------------------
-- Table structure for DM_TOOL_IN_OUT_STORAGE
-- ----------------------------
DROP TABLE IF EXISTS `DM_TOOL_IN_OUT_STORAGE`;
CREATE TABLE `DM_TOOL_IN_OUT_STORAGE` (
  `ID` varchar(32) NOT NULL COMMENT '唯一标识',
  `IOS_TOOL_ID` varchar(32) NOT NULL COMMENT '工具ID',
  `IOS_TYPE` char(1) DEFAULT NULL COMMENT '类型（1:入库，2:出库）',
  `IOS_AMOUNT` int(11) DEFAULT NULL COMMENT '数量',
  `IOS_RECORD_TIME` datetime DEFAULT NULL COMMENT '记录时间',
  `IOS_REMARK` varchar(255) DEFAULT NULL COMMENT '备注',
  `IOS_OPERATOR` varchar(32) DEFAULT NULL COMMENT '操作人',
  `IOS_OPERATE_TIME` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工具入库出库表';
