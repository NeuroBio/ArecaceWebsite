import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})

export class SiteMapComponent implements OnInit{

  labels: string[] = ['Worldbuilding', 'Story', 'Info', 'Misc'];
  linkList: string[][][] =[[//worldbuilding
                              ['Introduction to Arecace', '/world/introduction'],
                              ['Bestiary', '/world/bestiary'],
                              ['Characters', '/world/characters'],
                              ['Culture', '/world/culture'],
                              ['The DIA and Guilds', '/world/guilds'],
                              ['Siphoid/Source', '/world/source'],
                              ['Maps', '/world/maps']
                            ],

                            [//Story
                              ['Comic', '/comic'],
                              ['Scripts', '/story/Scripts'],
                              ['Narratives', '/story/Narratives']
                            ],

                            [//Info
                              ['About the Author', '/about'],
                              ['Cite Me', '/faq/copyright'],
                              ['Fanart/Fanfic Policy', '/faq/copyright'],
                              ['FAQ', '/faq'],
                              ['Site Map (here)', '/sitemap']
                            ],

                            [//Misc
                              ['Extras', '/extras'],
                              ['Playground','/playground']
                            ]]
  ngOnInit(){
    window.scroll(0,0);
  }

 }
