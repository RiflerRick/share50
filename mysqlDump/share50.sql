-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2016 at 12:24 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `share50`
--

-- --------------------------------------------------------

--
-- Table structure for table `companion`
--

CREATE TABLE IF NOT EXISTS `companion` (
  `tid` int(10) unsigned NOT NULL,
  `uid` int(11) unsigned NOT NULL,
  `comId` int(10) unsigned NOT NULL,
  `isAccepted` tinyint(1) NOT NULL,
  KEY `tid` (`tid`),
  KEY `uid` (`uid`),
  KEY `uid_2` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companion`
--

INSERT INTO `companion` (`tid`, `uid`, `comId`, `isAccepted`) VALUES
(47, 60, 61, 0);

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE IF NOT EXISTS `friends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL,
  `fUid` int(10) unsigned NOT NULL,
  `isAccepted` tinyint(1) NOT NULL COMMENT 'whether the person has accepted the friend request',
  `timeOfCreation` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid_2` (`uid`,`fUid`,`isAccepted`,`timeOfCreation`),
  UNIQUE KEY `uid_3` (`uid`,`fUid`,`isAccepted`,`timeOfCreation`),
  UNIQUE KEY `uid_4` (`uid`,`fUid`),
  KEY `uid` (`uid`),
  KEY `fUid` (`fUid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `uid`, `fUid`, `isAccepted`, `timeOfCreation`) VALUES
(9, 61, 60, 1, '2016-09-26');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `iid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL,
  `path` varchar(1000) NOT NULL,
  `tid` int(10) unsigned DEFAULT NULL COMMENT 'tour id',
  `pid` int(10) unsigned DEFAULT NULL COMMENT 'party id',
  PRIMARY KEY (`iid`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`iid`, `uid`, `path`, `tid`, `pid`) VALUES
(4, 60, '601.png', 47, NULL),
(5, 60, '602.jpeg', 47, NULL),
(6, 60, '603.jpeg', 47, NULL),
(7, 60, '604.jpeg', 47, NULL),
(8, 60, '605.jpeg', 47, NULL),
(9, 60, '606.jpeg', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `party`
--

CREATE TABLE IF NOT EXISTS `party` (
  `pid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL,
  `Description` text COMMENT 'description of the party',
  `start` date NOT NULL,
  `end` date NOT NULL,
  `destination` varchar(255) NOT NULL,
  `popularity` int(11) NOT NULL COMMENT 'populkarity again on the number of page visits',
  `randomVal` double NOT NULL,
  `isOver` tinyint(1) NOT NULL,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `start` (`start`,`end`,`destination`),
  KEY `uid` (`uid`),
  KEY `popularity` (`popularity`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `party`
--

INSERT INTO `party` (`pid`, `uid`, `Description`, `start`, `end`, `destination`, `popularity`, `randomVal`, `isOver`) VALUES
(1, 60, 'feeling awesome, cant wait to join with friends and go to manali', '2016-09-29', '2016-09-30', 'delhi', 0, 0.14324004366062582, 0);

-- --------------------------------------------------------

--
-- Table structure for table `placesvisited`
--

CREATE TABLE IF NOT EXISTS `placesvisited` (
  `tid` int(10) unsigned NOT NULL,
  `place` varchar(255) NOT NULL,
  `Description` text NOT NULL COMMENT 'description of the place',
  `visitingDate` timestamp NOT NULL,
  KEY `tid` (`tid`),
  KEY `tid_2` (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `placetovisit`
--

CREATE TABLE IF NOT EXISTS `placetovisit` (
  `tid` int(10) unsigned NOT NULL,
  `places` varchar(255) NOT NULL,
  `stipulatedDate` datetime NOT NULL,
  KEY `tid` (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE IF NOT EXISTS `tours` (
  `tid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL,
  `Description` text COMMENT 'description of the tour',
  `dateOfJourney` date NOT NULL,
  `dateOfReturn` date NOT NULL,
  `destination` varchar(255) NOT NULL,
  `popularity` int(11) NOT NULL COMMENT 'an integer that will actually define the number of page visits',
  `randomVal` double NOT NULL,
  `isOver` tinyint(1) NOT NULL,
  PRIMARY KEY (`tid`),
  UNIQUE KEY `dateOfJourney` (`dateOfJourney`,`dateOfReturn`,`destination`),
  UNIQUE KEY `uid_2` (`uid`,`dateOfJourney`,`dateOfReturn`,`destination`),
  KEY `uid` (`uid`),
  KEY `popularity` (`popularity`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=48 ;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`tid`, `uid`, `Description`, `dateOfJourney`, `dateOfReturn`, `destination`, `popularity`, `randomVal`, `isOver`) VALUES
(46, 60, 'feeling awesome, cant wait to join with friends and go to manali', '2016-09-26', '2016-09-28', 'manali', 0, 0.18897941336035728, 0),
(47, 60, 'feeling awesome, cant wait to join with friends and go to geneva', '2016-09-29', '2016-09-30', 'geneva', 0, 0.8876485293731093, 0);

-- --------------------------------------------------------

--
-- Table structure for table `userimages`
--

CREATE TABLE IF NOT EXISTS `userimages` (
  `uid` int(10) unsigned NOT NULL,
  `noOfImages` int(11) DEFAULT '0' COMMENT 'storing the number of images that the user has',
  UNIQUE KEY `uid` (`uid`),
  KEY `uid_2` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userimages`
--

INSERT INTO `userimages` (`uid`, `noOfImages`) VALUES
(60, 6),
(61, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilePicPath` varchar(255) DEFAULT NULL COMMENT 'profile pics path',
  `profilePicMime` char(15) DEFAULT NULL COMMENT 'mime type or image type of profile pic',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email` (`email`),
  KEY `email_2` (`email`),
  KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=62 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `name`, `email`, `dob`, `gender`, `password`, `profilePicPath`, `profilePicMime`) VALUES
(60, 'archan chatterjee', 'archan@gmail.com', '1940-01-01', 0, 'sha1$aa75a506$1$1b2ac5d3c55c8ff875582b651849723585eed61f', NULL, NULL),
(61, 'rajdeep mukherjee', 'rajdeep.mukherjee@st.niituniversity.in', '1940-01-01', 0, 'sha1$1afebd42$1$875f239c7b099d5a9e6c83962521033f9d47e081', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE IF NOT EXISTS `videos` (
  `vid` int(10) unsigned NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `path` varchar(1000) NOT NULL,
  `uploadTime` timestamp NOT NULL,
  `tid` int(10) unsigned DEFAULT NULL COMMENT 'tour id',
  `pid` int(10) unsigned DEFAULT NULL COMMENT 'party id ',
  PRIMARY KEY (`vid`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `visitor`
--

CREATE TABLE IF NOT EXISTS `visitor` (
  `pid` int(10) unsigned NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `visitorId` int(10) unsigned NOT NULL,
  `isAccepted` tinyint(1) NOT NULL,
  KEY `pid` (`pid`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `visitor`
--

INSERT INTO `visitor` (`pid`, `uid`, `visitorId`, `isAccepted`) VALUES
(1, 60, 61, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `companion`
--
ALTER TABLE `companion`
  ADD CONSTRAINT `fkCompanionUid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fktId` FOREIGN KEY (`tid`) REFERENCES `tours` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `fkfuIdFriends` FOREIGN KEY (`fUid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkuIdFriends` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fkuIdImages` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `party`
--
ALTER TABLE `party`
  ADD CONSTRAINT `fkuIdParty` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `placesvisited`
--
ALTER TABLE `placesvisited`
  ADD CONSTRAINT `fkIdPlaces` FOREIGN KEY (`tid`) REFERENCES `tours` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `placetovisit`
--
ALTER TABLE `placetovisit`
  ADD CONSTRAINT `fktIdPlacesToVisit` FOREIGN KEY (`tid`) REFERENCES `tours` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tours`
--
ALTER TABLE `tours`
  ADD CONSTRAINT `fkuIdTours` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userimages`
--
ALTER TABLE `userimages`
  ADD CONSTRAINT `fkUidImagesUsers` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `fkuIdVideos` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `visitor`
--
ALTER TABLE `visitor`
  ADD CONSTRAINT `fkpid` FOREIGN KEY (`pid`) REFERENCES `party` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkuid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
