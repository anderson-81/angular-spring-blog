package com.springblog.services.connections;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Service;

@Service
public class ConnectionSession {

    public Session OpenSession() {
        try {
            Configuration configuration = new Configuration().configure();
            StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder().
                    applySettings(configuration.getProperties());
            SessionFactory factory = configuration.buildSessionFactory(builder.build());
            return factory.openSession();
        } catch (HibernateException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
