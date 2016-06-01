package br.edu.unime.unimusic.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import br.com.caelum.vraptor.Consumes;
import br.com.caelum.vraptor.Controller;
import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.view.Results;
import br.edu.unime.unimusic.model.entities.Musica;

@Controller
public class MusicaController {
	
	/**
	 * @deprecated CDI eyes only
	 */
	protected MusicaController() {
	}
	
	public MusicaController(Result result) {
	}
	
	@Inject
	@Post("/salva")
	public void salva(Musica musica, Result result){
		
		System.out.println(musica);
		
		List<Musica> musicas = new ArrayList<Musica>();
		
		musicas.add(musica);
		
		result.use(Results.json())
		.withoutRoot()
		.from(musicas).serialize();
	}
	
}
