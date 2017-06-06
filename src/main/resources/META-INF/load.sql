INSERT INTO DESTINATION ( `NAME`, `LATITUDE`, `LONGITUDE`) VALUES ( 'Tokyo', 35.689487, 139.691706);
INSERT INTO DESTINATION ( `NAME`, `LATITUDE`, `LONGITUDE`) VALUES ( 'Prague', 50.075538, 14.437800);
INSERT INTO DESTINATION ( `NAME`, `LATITUDE`, `LONGITUDE`) VALUES ( 'Vienna', 48.208174, 16.373819);
INSERT INTO DESTINATION ( `NAME`, `LATITUDE`, `LONGITUDE`) VALUES ( 'Warsaw', 52.229676, 21.012229);
INSERT INTO DESTINATION ( `NAME`, `LATITUDE`, `LONGITUDE`) VALUES ( 'London', 51.507351, -0.127758);
INSERT INTO DESTINATION ( `NAME`, `LATITUDE`, `LONGITUDE`) VALUES ( 'Berlin', 52.520007, 13.404954);
INSERT INTO DESTINATION ( `NAME`, `LATITUDE`, `LONGITUDE`) VALUES ( 'Helsinki', 60.169856, 24.938379);
INSERT INTO DESTINATION ( `NAME`, `LATITUDE`, `LONGITUDE`) VALUES ( 'Stockholm', 59.329323, 18.068581);
INSERT INTO DESTINATION ( `NAME`, `LATITUDE`, `LONGITUDE`) VALUES ( 'Copenhagen', 55.676097, 12.568337);

INSERT INTO FLIGHT ( `DATE_OF_DEPARTURE`, `DISTANCE`, `PRICE`, `SEATS`, `NAME`, `FROM_DESTINATION`, `TO_DESTINATION`) VALUES ( '2017-04-15 15:00:00', 1042.223, 1024.00, 164, 'LH1694', 1, 2);
INSERT INTO FLIGHT ( `DATE_OF_DEPARTURE`, `DISTANCE`, `PRICE`, `SEATS`, `NAME`, `FROM_DESTINATION`, `TO_DESTINATION`) VALUES ( '2017-04-16 23:30:00', 1042.223, 1000.00, 164, 'LH1695', 2, 1);
INSERT INTO FLIGHT ( `DATE_OF_DEPARTURE`, `DISTANCE`, `PRICE`, `SEATS`, `NAME`, `FROM_DESTINATION`, `TO_DESTINATION`) VALUES ( '2017-04-18 03:21:40', 942.22, 1029.00, 164, 'LH1696', 2, 3);
INSERT INTO FLIGHT ( `DATE_OF_DEPARTURE`, `DISTANCE`, `PRICE`, `SEATS`, `NAME`, `FROM_DESTINATION`, `TO_DESTINATION`) VALUES ( '2017-04-17 19:05:50', 1042.223, 1046.00, 158, 'LH1697', 2, 4);
INSERT INTO FLIGHT ( `DATE_OF_DEPARTURE`, `DISTANCE`, `PRICE`, `SEATS`, `NAME`, `FROM_DESTINATION`, `TO_DESTINATION`) VALUES ( '2017-04-21 14:38:40', 1042.223, 924.00, 164, 'LH1698', 2, 5);
INSERT INTO FLIGHT ( `DATE_OF_DEPARTURE`, `DISTANCE`, `PRICE`, `SEATS`, `NAME`, `FROM_DESTINATION`, `TO_DESTINATION`) VALUES ( '2017-04-22 17:47:40', 1042.223, 1424.00, 158, 'LH1699', 2, 6);
INSERT INTO FLIGHT ( `DATE_OF_DEPARTURE`, `DISTANCE`, `PRICE`, `SEATS`, `NAME`, `FROM_DESTINATION`, `TO_DESTINATION`) VALUES ( '2017-04-23 21:15:50', 1042.223, 3024.00, 164, 'LH1700', 2, 7);
INSERT INTO FLIGHT ( `DATE_OF_DEPARTURE`, `DISTANCE`, `PRICE`, `SEATS`, `NAME`, `FROM_DESTINATION`, `TO_DESTINATION`) VALUES ( '2017-04-29 17:07:00', 1042.223, 5022.00, 158, 'LH1701', 2, 8);
INSERT INTO FLIGHT ( `DATE_OF_DEPARTURE`, `DISTANCE`, `PRICE`, `SEATS`, `NAME`, `FROM_DESTINATION`, `TO_DESTINATION`) VALUES ( '2017-05-25 02:22:10', 1042.223, 2251.00, 164, 'LH1702', 2, 9);

INSERT INTO CLIENT ( `DATE_OF_BIRTH`, `EMAIL`, `FIRST_NAME`, `LAST_NAME`, `KILOMETERS`, `PASSWORD`, `ROLE`) VALUES ('1978-04-01', 'user@example.com', 'Barry', 'Allen', 0, 'user', 'USER');
INSERT INTO CLIENT ( `DATE_OF_BIRTH`, `EMAIL`, `FIRST_NAME`, `LAST_NAME`, `KILOMETERS`, `PASSWORD`, `ROLE`) VALUES ('1978-04-04', 'admin@example.com', 'Barry', 'Allen', 0, 'admin', 'ADMIN');

INSERT INTO RESERVATION ( `DATE_CREATED`, `STATUS`, `PRICE`, `CLIENT_ID`) VALUES ( '2017-02-15 15:00:00', 'NEW', 1024.21, 1);
INSERT INTO RESERVATION ( `DATE_CREATED`, `STATUS`, `PRICE`, `CLIENT_ID`) VALUES ( '2017-03-15 15:30:00', 'NEW', 1024.21, 1);
INSERT INTO RESERVATION ( `DATE_CREATED`, `STATUS`, `PRICE`, `CLIENT_ID`) VALUES ( '2017-04-10 15:00:00', 'PAID', 1024.21, 1);
INSERT INTO RESERVATION ( `DATE_CREATED`, `STATUS`, `PRICE`, `CLIENT_ID`) VALUES ( '2017-01-12 15:00:00', 'CANCELLED', 1024.21, 1);
INSERT INTO RESERVATION ( `DATE_CREATED`, `STATUS`, `PRICE`, `CLIENT_ID`) VALUES ( '2017-02-13 15:00:00', 'NEW', 1024.21, 1);

INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 0, 1, 'BABY', 1, 1);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 2, 2, 'STUDENT', 1, 1);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 3, 3, 'STUDENT', 3, 1);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 2, 2, 'STUDENT', 4, 1);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 2, 2, 'STUDENT', 5, 2);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 1, 1, 'STUDENT', 6, 2);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 3, 3, 'ADULT', 7, 2);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 2, 2, 'CHILD', 8, 2);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 1, 1, 'CHILD', 9, 3);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 5, 5, 'CHILD', 8, 3);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 2, 2, 'CHILD', 7, 3);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 1, 1, 'CHILD', 6, 3);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 1, 1, 'ADULT', 5, 4);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 2, 2, 'ADULT', 4, 4);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 3, 3, 'ADULT', 3, 4);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 1, 1, 'ADULT', 2, 5);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 4, 4, 'ADULT', 1, 2);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 0, 1, 'BABY', 2, 3);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 1, 1, 'ADULT', 3, 4);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 2, 2, 'ADULT', 4, 1);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 3, 3, 'SENIOR', 5, 2);
INSERT INTO RESERVATION_ITEM ( `NUMBER_OF_SEATS`, `NUMBER_OF_TICKETS`, `PASSENGER_TYPE`, `FLIGHT_ID`, `RESERVATION_ID`) VALUES ( 1, 1, 'SENIOR', 6, 1);