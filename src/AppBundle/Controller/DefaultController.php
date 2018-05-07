<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Article;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $allArticle = $this->getDoctrine()
            ->getRepository(Article::class)
            ->findAll();
        // TODO: LIMIT ARTICLE DISPLAY
        return $this->render('AppBundle:Default:default.html.twig',
            [
                'articles' => $allArticle,
            ]
        );
    }

    /**
     * CE CODE PERMET DE GENERER 1 PAGE PAR ID, DONC 1 PAGE PAR ARTICLE
     * @Route("/{id}", name="article_display", requirements={"id":"\d+"})
     * @param Request $request
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function displayAction(Request $request, int $id)
    {
        $singleArticle = $this->getDoctrine()
            ->getRepository(Article::class)
            ->findOneById($id);

        return $this->render('AppBundle:Article:display.html.twig',
            [
                'article' => $singleArticle,
            ]
        );
    }
}
