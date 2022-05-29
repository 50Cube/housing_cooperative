package pl.lodz.p.flats.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.lodz.p.common.dto.AccountDto;
import pl.lodz.p.common.dto.FlatDto;
import pl.lodz.p.common.exceptions.AccountNotFoundException;
import pl.lodz.p.common.exceptions.AppBaseException;
import pl.lodz.p.common.exceptions.FlatNotFoundException;
import pl.lodz.p.flats.entities.Flat;
import pl.lodz.p.flats.mappers.FlatMapper;
import pl.lodz.p.flats.repositories.FlatRepository;
import pl.lodz.p.flats.utils.ArrangeFlatRequest;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlatService {

    private final FlatRepository flatRepository;
    private final AccountServiceClient accountServiceClient;

    public List<FlatDto> getFlats() {
        return FlatMapper.toDtos(flatRepository.findAll());
    }

    public List<FlatDto> getFlatsForBuilding(String buildingKey) {
        List<FlatDto> flats = FlatMapper.toDtos(flatRepository.findAll().stream()
                .filter(flat -> flat.getBuilding().getBusinessKey().equals(buildingKey))
                .toList());
        List<AccountDto> accounts = accountServiceClient.getAccountsByLogin(flats.stream().map(flat -> flat.getAccountDto().getLogin()).toList());
        flats.forEach(flat -> flat.setAccountDto(accounts.stream().filter(f -> f.getLogin().equals(flat.getAccountDto().getLogin())).findFirst()
                .orElse(new AccountDto())));
        return flats;
    }

    public FlatDto getUserFlat(String login) throws AppBaseException {
        return FlatMapper.toDto(flatRepository.findByUserLogin(login)
                .orElseThrow(FlatNotFoundException::new));
    }

    public String getFlatUser(String flatKey) throws AppBaseException {
        return flatRepository.findByBusinessKey(flatKey)
                .orElseThrow(FlatNotFoundException::new)
                .getUserLogin();
    }

    public void arrangeFlat(ArrangeFlatRequest request) throws AppBaseException {
        Flat flat = flatRepository.findByBusinessKey(request.getFlatKey())
                .orElseThrow(FlatNotFoundException::new);
        if(!flat.getBuilding().getBusinessKey().equals(request.getBuildingKey()))
            throw new AppBaseException();
        AccountDto account = accountServiceClient.getAccount(request.getLogin());
        if(account.getLogin().isEmpty())
            throw new AccountNotFoundException();
        flat.setUserLogin(account.getLogin());
        flatRepository.saveAndFlush(flat);
    }
}
