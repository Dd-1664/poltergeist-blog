<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Article
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @var integer
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @var string
     */
    protected $author;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $title;

    /**
     * @ORM\Column(type="text", length=65535 , name="body_text")
     */
    protected $articleText;

    /**
     * @ORM\Column(type="integer", length=3,  name="read_time")
     */
    protected $readTime;

    /**
     * @ORM\Column(type="string", length=255, name="picture_link")
     */
    protected $pictureLink;

    /**
     * @ORM\Column(type="date", name="creation_date", nullable=true)
     */
    protected $createdAt;


    
    // GETTERS & SETTERS
    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param mixed $author
     */
    public function setAuthor($author): void
    {
        $this->author = $author;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title): void
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getArticleText()
    {
        return $this->articleText;
    }

    /**
     * @param mixed $articleText
     */
    public function setArticleText($articleText): void
    {
        $this->articleText = $articleText;
    }

    /**
     * @return mixed
     */
    public function getReadTime()
    {
        return $this->readTime;
    }

    /**
     * @param mixed $readTime
     */
    public function setReadTime($readTime): void
    {
        $this->readTime = $readTime;
    }

    /**
     * @return mixed
     */
    public function getPictureLink()
    {
        return $this->pictureLink;
    }

    /**
     * @param mixed $pictureLink
     */
    public function setPictureLink($pictureLink): void
    {
        $this->pictureLink = $pictureLink;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param mixed $createdAt
     */
    public function setCreatedAt($createdAt): void
    {
        $this->createdAt = $createdAt;
    }
}
