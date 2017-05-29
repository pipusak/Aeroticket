package cz.cvut.fel.aeroticket.banner;


import java.io.IOException;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;
/**
 * Created by TomasNovotny on 28.5.2017.
 */
 class BannerEmit {
    private static final String EXCHANGE_NAME = "banner";

    static void send(String message)
            throws java.io.IOException, TimeoutException {

        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");



        channel.basicPublish(EXCHANGE_NAME, "", null, message.getBytes());


        channel.close();
        connection.close();
    }
 }

