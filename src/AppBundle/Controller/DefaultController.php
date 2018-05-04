<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Article;

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






        return $this->render('AppBundle:Default:default.html.twig',
            [
                'articles' => $allArticle
                // 'form' => $form->createView()
            ]
        );
    }
}