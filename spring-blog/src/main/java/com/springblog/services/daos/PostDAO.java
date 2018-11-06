package com.springblog.services.daos;

import com.springblog.dtos.PostDTO;
import java.util.Calendar;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import com.springblog.services.connections.ConnectionSession;
import com.springblog.models.Author;
import com.springblog.models.Post;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PostDAO {
    
    @Autowired
    private ConnectionSession connectionSession;
    
    @Autowired
    private AuthorDAO authorDAO;

    public int InsertPost(Post post, Integer author_id) {
        Author author = authorDAO.GetAuthorByID(author_id);
        if (author != null) {
            try {
                Session session = connectionSession.OpenSession();
                if (session != null) {
                    post.setDatePost(Calendar.getInstance().getTime());
                    post.setAuthor(author);
                    post.setDateUpdate(null);
                    session.save(post);
                    session.beginTransaction().commit();
                    session.close();
                    System.out.println("Successfully inserted.");
                    return 1;
                }
            } catch (HibernateException e) {
                return -1;
            }
        }
        System.out.println("Author not found.");
        return 0;
    }

    public int EditPost(Post post, Integer author_id) {
        Author author = authorDAO.GetAuthorByID(author_id);
        if (author != null) {
            if (author.getId() == post.getAuthor().getId()) {
                try {
                    Session session = connectionSession.OpenSession();
                    if (session != null) {
                        post.setDateUpdate(Calendar.getInstance().getTime());
                        session.update(post);
                        session.beginTransaction().commit();
                        session.close();
                        System.out.println("Successfully edited.");
                        return 1;
                    }
                } catch (HibernateException e) {
                    System.out.println(e.getMessage());
                    return -1;
                }
            } else {
                System.out.println("Only author can edit or delete this post.");
                return 0;
            }
        }
        System.out.println("Author not found.");
        return 2;
    }

    public int DeletePost(Post post, Integer author_id) {
        Author author = authorDAO.GetAuthorByID(author_id);
        if (author != null) {
            if (author.getId() == post.getAuthor().getId()) {
                Session session = connectionSession.OpenSession();
                try {
                    if (session != null) {
                        session.delete(post);
                        session.beginTransaction().commit();
                        session.close();
                        System.out.println("Successfully deleted.");
                        return 1;
                    }
                } catch (HibernateException e) {
                    session.close();
                    System.out.println(e.getMessage());
                    return -1;
                }
            } else {
                System.out.println("Only author can edit or delete this post.");
                return 0;
            }
        }
        System.out.println("Author not found.");
        return 2;
    }

    public Post GetPostByID(Integer id) {
        try {
            Session session = connectionSession.OpenSession();
            if (session != null) {
                String sql = "from Post where id = :id";
                Query query = session.createQuery(sql);
                query.setParameter("id", id);
                Post post = (Post) query.uniqueResult();
                session.close();
                return post;
            }
            return null;
        } catch (HibernateException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public List<Post> GetPostByTitle(String title) {
        try {
            Session session = connectionSession.OpenSession();
            if (session != null) {
                //List<Post> posts  = session.createSQLQuery("select p.id as id, p.title as title, p.briefing as briefing, p.text as text, p.datepost as datepost, p.dateupdate as dateupdate from Post p where title LIKE :title").setParameter("title", title + '%').setResultTransformer(Transformers.aliasToBean(Post.class)).list();
                List<Post> posts  = session.createSQLQuery("select p.id, p.title, p.briefing, p.text, p.datepost, p.dateupdate, a.name from Post p INNER JOIN Author a ON p.author_id = a.id where title LIKE :title ORDER BY  p.id DESC").setParameter("title", title + '%').setResultTransformer(Transformers.aliasToBean(PostDTO.class)).list();
                session.close();
                return posts;
            }
            return null;
        } catch (HibernateException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
