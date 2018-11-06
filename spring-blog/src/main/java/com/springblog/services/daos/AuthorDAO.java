package com.springblog.services.daos;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import com.springblog.services.connections.ConnectionSession;
import com.springblog.models.Author;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AuthorDAO {
    
    @Autowired
    private ConnectionSession connectionSession;
    
    public Author GetAuthorByID(Integer id) {
        try {
            Session session = connectionSession.OpenSession();
            if (session != null) {
                String sql = "from Author where id = :id";
                Query query = session.createQuery(sql);
                query.setParameter("id", id);
                Author author = (Author) query.uniqueResult();
                session.close();
                return author;
            }
            System.out.println("Without session.");
            return null;
        } catch (HibernateException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
