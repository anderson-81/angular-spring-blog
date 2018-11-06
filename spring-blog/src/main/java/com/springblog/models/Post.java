package com.springblog.models;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "POST")
@SequenceGenerator(name = "SeqPostId", sequenceName = "SEQPOSTID", initialValue = 1, allocationSize = 1)
public class Post implements Serializable {

    private static final long serialVersionUID = 2912945815896575160L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private int id;

    @Column(name = "TITLE", length = 255, nullable = false)
    private String title;

    @Column(name = "BRIEFING", length = 255, nullable = false)
    private String briefing;

    @Column(name = "TEXT", length = 10485760, nullable = false)
    private String text;

    @Lob
    @Column(name = "PICTURE", nullable = true)
    private byte[] picture;
    
    @Column(name = "DATEPOST", nullable = false)
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date datepost;
    
    @Column(name = "DATEUPDATE", nullable = true)
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date dateupdate;

    @ManyToOne
    @JoinColumn(name = "AUTHOR_ID")
    private Author author;

    public Post(int id, String title, String briefing, String text, byte[] picture, Date datepost, Date dateupdate, Author author) {
        this.id = id;
        this.title = title;
        this.briefing = briefing;
        this.text = text;
        this.picture = picture;
        this.datepost = datepost;
        this.dateupdate = dateupdate;
        this.author = author;
    }
    
    public Post(){
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBriefing() {
        return briefing;
    }

    public void setBriefing(String briefing) {
        this.briefing = briefing;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }
    
    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }
    
    public Date getDatePost() {
        return datepost;
    }

    public void setDatePost(Date datepost) {
        this.datepost = datepost;
    }

    public Date getDateUpdate() {
        return dateupdate;
    }

    public void setDateUpdate(Date dateupdate) {
        this.dateupdate = dateupdate;
    }
}
