package com.springblog.services.daos;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import com.springblog.services.connections.ConnectionSession;
import com.springblog.services.security.Hash;
import com.springblog.models.UserSys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAO {

    @Autowired
    private ConnectionSession connectionSession;
    
    @Autowired
    private Hash hash;
    
    public UserSys Login(UserSys usersys) {
        Session session = connectionSession.OpenSession();
        if (session != null) {
            try {
                String sql = "from UserSys where username = :username AND password = :password";
                Query query = session.createQuery(sql);
                query.setParameter("username", hash.HashString(usersys.getUsername()));
                query.setParameter("password", hash.HashString(usersys.getPassword()));
                UserSys usersys_result = (UserSys) query.uniqueResult();
                return usersys_result;
            } catch (HibernateException e) {
                System.err.println(e.getMessage());
                return null;
            }
        }
        return null;
    }
}
