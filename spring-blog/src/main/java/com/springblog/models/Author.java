package com.springblog.models;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "AUTHOR")
@SequenceGenerator(name = "SeqAuthorId", sequenceName = "SEQAUTHORID", initialValue = 1, allocationSize = 1)
public class Author implements Serializable {

    private static final long serialVersionUID = -3601793928255050291L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private int id;

    @Column(name = "NAME", length = 100, nullable = false)
    private String name;
    
    @Column(name = "EMAIL", length = 100, nullable = false)
    private String email;

    @Column(name = "BIRTHDAY", nullable = false)
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date birthday;

    @Column(name = "GENDER", nullable = false, length = 1)
    private String gender;

    @Column(name = "PICTURE", nullable = true)
    private byte[] picture;

    @OneToOne(mappedBy = "author", cascade = CascadeType.ALL)
    private UserSys usersys;
    
    //@OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    private List<Post> posts;
    
    public Author() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public UserSys getUserSys() {
        return usersys;
    }

    public void setUserSys(UserSys usersys) {
        this.usersys = usersys;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
