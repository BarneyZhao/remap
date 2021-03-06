import { connect } from 'react-redux';
import ConfigurationDialog from './ConfigurationDialog';
import { RootState } from '../../../store/state';
import { LayoutOptionsActions } from '../../../actions/actions';
import { storageActionsThunk } from '../../../actions/storage.action';
import { KeyboardDefinitionSchema } from '../../../gen/types/KeyboardDefinition';

const mapStateToProps = (state: RootState) => {
  return {
    keyboardLayoutOptions: state.entities.keyboardDefinition?.layouts.labels,
    selectedKeyboardOptions: state.configure.layoutOptions.selectedOptions,
  };
};
export type ConfigurationDialogStateType = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (_dispatch: any) => {
  return {
    setLayoutOption: (optionIndex: number, option: string | null) => {
      _dispatch(LayoutOptionsActions.updateSelectedOption(optionIndex, option));
    },
    refreshKeyboardDefinition: (
      keyboardDefinition: KeyboardDefinitionSchema
    ) => {
      _dispatch(
        storageActionsThunk.refreshKeyboardDefinition(keyboardDefinition)
      );
    },
  };
};

export type ConfigurationDialogActionsType = ReturnType<
  typeof mapDispatchToProps
>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationDialog);
