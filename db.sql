-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: localhost    Database: shopdb
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `all_music_tab`
--

DROP TABLE IF EXISTS `all_music_tab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `all_music_tab` (
  `sql_no` int(11) NOT NULL AUTO_INCREMENT,
  `song` varchar(15) NOT NULL COMMENT '歌名',
  `singer` varchar(45) NOT NULL COMMENT '歌手',
  `tag` varchar(45) NOT NULL COMMENT '風格',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '狀態/0:刪除 1:存在\n',
  `create_date` datetime NOT NULL COMMENT '創建日',
  `create_user` varchar(45) NOT NULL COMMENT '創建者',
  PRIMARY KEY (`sql_no`),
  UNIQUE KEY `sql_no_UNIQUE` (`sql_no`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_music_tab`
--

LOCK TABLES `all_music_tab` WRITE;
/*!40000 ALTER TABLE `all_music_tab` DISABLE KEYS */;
INSERT INTO `all_music_tab` VALUES (1,'你好不好','周興哲','1',1,'2022-08-13 00:00:00','1'),(2,'告白氣球','周杰倫','1',1,'2022-08-13 00:00:00','1'),(3,'勇氣','梁靜茹','1',1,'2022-08-13 00:00:00','1'),(4,'愛你','王心凌','1',1,'2022-08-13 00:00:00','1'),(5,'如果可以','韋禮安','1',1,'2022-08-13 00:00:00','1'),(6,'不是因為天氣晴朗才愛你','理想混蛋','1',1,'2022-08-13 00:00:00','1'),(7,'稻香','周杰倫','1',1,'2022-08-13 00:00:00','1'),(8,'刻在我心底的名字','盧廣仲','1',1,'2022-08-13 00:00:00','1'),(9,'戒菸','李榮浩','1',1,'2022-08-13 00:00:00','1'),(10,'修煉愛情','林俊傑','1',1,'2022-08-13 00:00:00','1'),(11,'夜空中最亮的星','逃跑計劃','1',1,'2022-08-13 00:00:00','1');
/*!40000 ALTER TABLE `all_music_tab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `sql_no` int(11) NOT NULL AUTO_INCREMENT,
  `group` varchar(45) NOT NULL COMMENT '群組',
  `num` varchar(45) NOT NULL,
  `value` varchar(45) NOT NULL COMMENT 'Value',
  PRIMARY KEY (`sql_no`),
  UNIQUE KEY `sql_no_UNIQUE` (`sql_no`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'style','1','輕快'),(2,'style','2','悲傷'),(3,'style','3','勵志'),(4,'style','4','熱鬧'),(5,'style','5','抒情'),(6,'style','6','搖滾'),(7,'style','7','小品');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_music`
--

DROP TABLE IF EXISTS `my_music`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_music` (
  `sql_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `all_music_tab_id` varchar(45) NOT NULL,
  `create_date` datetime NOT NULL,
  `create_user` varchar(45) NOT NULL,
  PRIMARY KEY (`sql_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_music`
--

LOCK TABLES `my_music` WRITE;
/*!40000 ALTER TABLE `my_music` DISABLE KEYS */;
INSERT INTO `my_music` VALUES (1,'13','1','2022-08-13 00:00:00','13');
/*!40000 ALTER TABLE `my_music` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `sql_no` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL COMMENT '昵稱',
  `pwd` varchar(124) NOT NULL COMMENT '密碼',
  `head_img` varchar(524) NOT NULL COMMENT '頭像',
  `auth` varchar(45) NOT NULL COMMENT '權限/S管理/A會員/B測試人員/C遊客',
  PRIMARY KEY (`sql_no`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'大釗','$2a$10$DwVyMUdy6mX23U2pzcavP.mMX54O/v8f8m31acREEOtOajMzf0cOe','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg',''),(2,'小D','$2a$10$7m9Mq5vE7fm4N94wLUxh2OCul8vFMgrDvzaebYJP2.ld3oxMQqEvW','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg',''),(3,'老王','$2a$10$iC9SBD/ogqMnHiZBPDMsB.iUTlYBB6UO97AHpw2FNELm0itwSoCQ2','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg',''),(4,'冰冰','$2a$10$jacNuEUM9dtT5V/B8Ef8f.65cCTZUOwGJcmNGEf03jHgPn9d93EF.','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg',''),(5,'anna','$2a$10$ltCNLCUZnLRTslMVcBxagef4LGbQQNuzSxx1LPg5Ia2y0EbU.DbrK','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',''),(6,'張三','$2a$10$vbzFnNJefweElI.FdYpBDOD2WaxRKM.Ikzgb2cE227fudIlicprIm','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg',''),(7,'李四','$2a$10$uUbk7k3oJLhdVCdyb2Iedu3.N1zjmjhBh6SfMB8ZkEvSSaLNAxxfy','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg',''),(8,'hi','$2a$10$RLiaO4B8iwxNfvcXq5RIieH6UCwGz91cfO0owZd9IQP0/YVEQtyMm','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',''),(10,'test','$2a$10$AJ.rInH/TrT8cVMR4nd3QuJGE6orw8aY1SU5aHvlYL5.ZeuFN0o4q','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg',''),(11,'123456','$2a$10$YPnfXSh.a5EmoN0b3/FkqeqAXFPSkEQIGZ4i07AK6AQ8kABb16miS','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg',''),(12,'555555','$2a$10$qInMzlsuWiYLzjcSSv.pLeAOvu7lOgU3iwFyDpzSnryBB1Rb8ccC2','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',''),(13,'666666','$2a$10$s8WL2XdByKfaxE29qiR7iu3GcNengpjaIq8SRvk7qN8hi4ROcY/Fy','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg',''),(14,'test1','$2a$10$WxQSnVBjXLo3SaoyJ87/ZetenBQRoWsgzOyVd0dfoIeoJGcINYZvy','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `sql_no` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '課程id',
  `title` varchar(524) DEFAULT NULL COMMENT '視頻標題',
  `course_img` varchar(524) DEFAULT NULL COMMENT '封面圖',
  `price` varchar(11) DEFAULT NULL COMMENT '價格,分',
  `point` double(11,2) DEFAULT '8.70' COMMENT '默認8.7，最高10分',
  `category` varchar(50) DEFAULT NULL COMMENT '課程分類',
  `del` int(11) DEFAULT '0' COMMENT '是否刪除',
  PRIMARY KEY (`sql_no`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (1,'22年新版【前端高級工程師】面試專題第二季','https://file.xdclass.net/video/2022/77-QD/cover.jpeg','109',9.80,'front',1),(2,'22年新版-零基礎玩轉vue3+開發仿美團外賣項目vue視頻','https://file.xdclass.net/video/2022/75-Vue3/cover1.jpeg','99',9.50,'front',0),(3,'新版webpack5丨帶你玩轉時下最流行的構建工具','https://file.xdclass.net/video/2022/76-webpack5/cover.jpeg','59',9.30,'front',0),(4,'22年新版-玩轉Git零基礎到進階實戰 git視頻急速入門','https://file.xdclass.net/video/2021/74-git/WechatIMG3026.jpeg','39',9.20,'front',0),(5,'22年新版-玩轉ECMAScript6零基礎到進階實戰es6視頻','https://file.xdclass.net/video/2021/73-ES6/cover.jpeg','49',9.40,'front',0),(6,'22年新-Javascript視頻前端零基礎到項目實戰/js視頻','https://file.xdclass.net/video/2021/70-Javascript/cover.jpeg','29',9.20,'front',0),(7,'22年新版-玩轉html+css前端零基礎到項目實戰','https://file.xdclass.net/video/2021/69-HTML%2BCSS/cover.jpeg','29',9.40,'front',0),(8,'微服務架構-海量數據商用短鏈平台項目大課【預售特價中】','https://file.xdclass.net/video/2021/71-HLSJCL/cover.jpeg','3699',9.90,'back',0),(9,'工業級PaaS雲平台+SpringCloudAlibaba 綜合項目實戰','https://file.xdclass.net/video/2022/62-PaaS/cover.jpeg','1699',9.90,'back',0),(10,'22年新版-架構師系列-新版ShardingJDBC分庫分表mysql數據庫實戰','https://file.xdclass.net/video/2022/72-ShardingJDBC/cover.jpeg','129',9.90,'back',0),(11,'小滴課堂全棧/後端高級工程師面試專題第一季','https://file.xdclass.net/video/2020/%E9%9D%A2%E8%AF%95%E4%B8%93%E9%A2%98/gw-ms.png','158',9.90,'back',0),(12,'高級mysql第二季視頻教程/高可用集群/springboot2.5分庫分表','https://file.xdclass.net/video/2021/68-MySQL/cover.jpeg','189',9.90,'back',0),(13,'三天掌握 Kafka 消息隊列 小白到專家之路-大數據教程1','https://file.xdclass.net/video/2021/65-kafka/xzt.png','98',9.90,'back',1),(14,'小白到專家-分布式緩存Redis6.X+高可用集群','https://file.xdclass.net/video/2021/64-redis6/cover.jpeg','89',9.90,'back',0),(15,'Node.js教程零基礎入門到項目實戰前端視頻教程','https://file.xdclass.net/video/2021/2-zt/47.jpeg','99',9.90,'all',0),(16,'小滴課堂超級會員全棧課程免費看','https://file.xdclass.net/video/2022/banner/03.jpeg','1699',9.90,'all',0),(17,'ssm新版SpringBoot2.3/spring5/mybatis3','https://file.xdclass.net/video/2020/SSM/zt-ssm.png','68',9.90,'back',0),(18,'玩轉新版高性能RabbitMQ容器化分布式集群實戰','https://file.xdclass.net/video/2021/61-RabbitMq/zt-rabbitmq.jpeg','79',9.20,'back',0);
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-15 10:19:23
