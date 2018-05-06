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
     * @var string
     */
    protected $title;

    /**
     * @ORM\Column(type="text", length=65535 , name="body_text")
     */
    protected $articleText;

    /**
     * @ORM\Column(type="integer", length=3,  name="read_time")
     * @var integer
     */
    protected $readTime;

    /**
     * @ORM\Column(type="string", length=255, name="picture_link")
     * @var string
     */
    protected $pictureLink;

    
    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getAuthor()
    {
        return $this->author;
    }

    public function setAuthor($author)
    {
        $this->author = $author;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getArticleText()
    {
        return $this->articleText;
    }

    public function setArticleText($articleText)
    {
        $this->articleText = $articleText;
    }

    public function getReadTime()
    {
        return $this->readTime;
    }

    public function setReadTime($readTime)
    {
        $this->readTime = $readTime;
    }

    public function getPictureLink()
    {
        return $this->pictureLink;
    }

    public function setPictureLink($pictureLink)
    {
        $this->pictureLink = $pictureLink;
    }
}
