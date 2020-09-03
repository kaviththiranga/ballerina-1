// This is an auto-generated file. Do not edit.
// Run 'BALLERINA_HOME="your/ballerina/home" npm run gen-models' to generate.
import * as Ballerina from "./syntax-tree-interfaces";

export class STKindChecker {
  public static isAbstractKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.AbstractKeyword {
    return node.kind === "AbstractKeyword";
  }

  public static isActionStatement(
    node: Ballerina.STNode
  ): node is Ballerina.ActionStatement {
    return node.kind === "ActionStatement";
  }

  public static isAnnotation(
    node: Ballerina.STNode
  ): node is Ballerina.Annotation {
    return node.kind === "Annotation";
  }

  public static isAnyKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.AnyKeyword {
    return node.kind === "AnyKeyword";
  }

  public static isAnyTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.AnyTypeDesc {
    return node.kind === "AnyTypeDesc";
  }

  public static isAnydataKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.AnydataKeyword {
    return node.kind === "AnydataKeyword";
  }

  public static isAnydataTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.AnydataTypeDesc {
    return node.kind === "AnydataTypeDesc";
  }

  public static isAssignmentStatement(
    node: Ballerina.STNode
  ): node is Ballerina.AssignmentStatement {
    return node.kind === "AssignmentStatement";
  }

  public static isAsteriskToken(
    node: Ballerina.STNode
  ): node is Ballerina.AsteriskToken {
    return node.kind === "AsteriskToken";
  }

  public static isAtToken(node: Ballerina.STNode): node is Ballerina.AtToken {
    return node.kind === "AtToken";
  }

  public static isBacktickToken(
    node: Ballerina.STNode
  ): node is Ballerina.BacktickToken {
    return node.kind === "BacktickToken";
  }

  public static isBinaryExpression(
    node: Ballerina.STNode
  ): node is Ballerina.BinaryExpression {
    return node.kind === "BinaryExpression";
  }

  public static isBitwiseAndToken(
    node: Ballerina.STNode
  ): node is Ballerina.BitwiseAndToken {
    return node.kind === "BitwiseAndToken";
  }

  public static isBitwiseXorToken(
    node: Ballerina.STNode
  ): node is Ballerina.BitwiseXorToken {
    return node.kind === "BitwiseXorToken";
  }

  public static isBlockStatement(
    node: Ballerina.STNode
  ): node is Ballerina.BlockStatement {
    return node.kind === "BlockStatement";
  }

  public static isBooleanKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.BooleanKeyword {
    return node.kind === "BooleanKeyword";
  }

  public static isBooleanTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.BooleanTypeDesc {
    return node.kind === "BooleanTypeDesc";
  }

  public static isBracedExpression(
    node: Ballerina.STNode
  ): node is Ballerina.BracedExpression {
    return node.kind === "BracedExpression";
  }

  public static isByteKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ByteKeyword {
    return node.kind === "ByteKeyword";
  }

  public static isByteTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.ByteTypeDesc {
    return node.kind === "ByteTypeDesc";
  }

  public static isCallStatement(
    node: Ballerina.STNode
  ): node is Ballerina.CallStatement {
    return node.kind === "CallStatement";
  }

  public static isCheckExpression(
    node: Ballerina.STNode
  ): node is Ballerina.CheckExpression {
    return node.kind === "CheckExpression";
  }

  public static isCheckKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.CheckKeyword {
    return node.kind === "CheckKeyword";
  }

  public static isCheckpanicKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.CheckpanicKeyword {
    return node.kind === "CheckpanicKeyword";
  }

  public static isCloseBracePipeToken(
    node: Ballerina.STNode
  ): node is Ballerina.CloseBracePipeToken {
    return node.kind === "CloseBracePipeToken";
  }

  public static isCloseBraceToken(
    node: Ballerina.STNode
  ): node is Ballerina.CloseBraceToken {
    return node.kind === "CloseBraceToken";
  }

  public static isCloseBracketToken(
    node: Ballerina.STNode
  ): node is Ballerina.CloseBracketToken {
    return node.kind === "CloseBracketToken";
  }

  public static isCloseParenToken(
    node: Ballerina.STNode
  ): node is Ballerina.CloseParenToken {
    return node.kind === "CloseParenToken";
  }

  public static isColonToken(
    node: Ballerina.STNode
  ): node is Ballerina.ColonToken {
    return node.kind === "ColonToken";
  }

  public static isCommaToken(
    node: Ballerina.STNode
  ): node is Ballerina.CommaToken {
    return node.kind === "CommaToken";
  }

  public static isCompoundAssignmentStatement(
    node: Ballerina.STNode
  ): node is Ballerina.CompoundAssignmentStatement {
    return node.kind === "CompoundAssignmentStatement";
  }

  public static isComputedNameField(
    node: Ballerina.STNode
  ): node is Ballerina.ComputedNameField {
    return node.kind === "ComputedNameField";
  }

  public static isConstDeclaration(
    node: Ballerina.STNode
  ): node is Ballerina.ConstDeclaration {
    return node.kind === "ConstDeclaration";
  }

  public static isConstKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ConstKeyword {
    return node.kind === "ConstKeyword";
  }

  public static isContinueKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ContinueKeyword {
    return node.kind === "ContinueKeyword";
  }

  public static isContinueStatement(
    node: Ballerina.STNode
  ): node is Ballerina.ContinueStatement {
    return node.kind === "ContinueStatement";
  }

  public static isDecimalFloatingPointLiteral(
    node: Ballerina.STNode
  ): node is Ballerina.DecimalFloatingPointLiteral {
    return node.kind === "DecimalFloatingPointLiteral";
  }

  public static isDecimalIntegerLiteral(
    node: Ballerina.STNode
  ): node is Ballerina.DecimalIntegerLiteral {
    return node.kind === "DecimalIntegerLiteral";
  }

  public static isDocumentationLine(
    node: Ballerina.STNode
  ): node is Ballerina.DocumentationLine {
    return node.kind === "DocumentationLine";
  }

  public static isDocumentationString(
    node: Ballerina.STNode
  ): node is Ballerina.DocumentationString {
    return node.kind === "DocumentationString";
  }

  public static isDotToken(node: Ballerina.STNode): node is Ballerina.DotToken {
    return node.kind === "DotToken";
  }

  public static isDoubleEqualToken(
    node: Ballerina.STNode
  ): node is Ballerina.DoubleEqualToken {
    return node.kind === "DoubleEqualToken";
  }

  public static isEllipsisToken(
    node: Ballerina.STNode
  ): node is Ballerina.EllipsisToken {
    return node.kind === "EllipsisToken";
  }

  public static isElseBlock(
    node: Ballerina.STNode
  ): node is Ballerina.ElseBlock {
    return node.kind === "ElseBlock";
  }

  public static isElseKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ElseKeyword {
    return node.kind === "ElseKeyword";
  }

  public static isEofToken(node: Ballerina.STNode): node is Ballerina.EofToken {
    return node.kind === "EofToken";
  }

  public static isEqualToken(
    node: Ballerina.STNode
  ): node is Ballerina.EqualToken {
    return node.kind === "EqualToken";
  }

  public static isErrorKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ErrorKeyword {
    return node.kind === "ErrorKeyword";
  }

  public static isErrorTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.ErrorTypeDesc {
    return node.kind === "ErrorTypeDesc";
  }

  public static isExpressionListItem(
    node: Ballerina.STNode
  ): node is Ballerina.ExpressionListItem {
    return node.kind === "ExpressionListItem";
  }

  public static isExternalFunctionBody(
    node: Ballerina.STNode
  ): node is Ballerina.ExternalFunctionBody {
    return node.kind === "ExternalFunctionBody";
  }

  public static isExternalKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ExternalKeyword {
    return node.kind === "ExternalKeyword";
  }

  public static isFalseKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.FalseKeyword {
    return node.kind === "FalseKeyword";
  }

  public static isFieldAccess(
    node: Ballerina.STNode
  ): node is Ballerina.FieldAccess {
    return node.kind === "FieldAccess";
  }

  public static isFloatKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.FloatKeyword {
    return node.kind === "FloatKeyword";
  }

  public static isFloatTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.FloatTypeDesc {
    return node.kind === "FloatTypeDesc";
  }

  public static isForeachKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ForeachKeyword {
    return node.kind === "ForeachKeyword";
  }

  public static isForeachStatement(
    node: Ballerina.STNode
  ): node is Ballerina.ForeachStatement {
    return node.kind === "ForeachStatement";
  }

  public static isFunctionBodyBlock(
    node: Ballerina.STNode
  ): node is Ballerina.FunctionBodyBlock {
    return node.kind === "FunctionBodyBlock";
  }

  public static isFunctionCall(
    node: Ballerina.STNode
  ): node is Ballerina.FunctionCall {
    return node.kind === "FunctionCall";
  }

  public static isFunctionDefinition(
    node: Ballerina.STNode
  ): node is Ballerina.FunctionDefinition {
    return node.kind === "FunctionDefinition";
  }

  public static isFunctionKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.FunctionKeyword {
    return node.kind === "FunctionKeyword";
  }

  public static isFutureKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.FutureKeyword {
    return node.kind === "FutureKeyword";
  }

  public static isGtEqualToken(
    node: Ballerina.STNode
  ): node is Ballerina.GtEqualToken {
    return node.kind === "GtEqualToken";
  }

  public static isGtToken(node: Ballerina.STNode): node is Ballerina.GtToken {
    return node.kind === "GtToken";
  }

  public static isHandleKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.HandleKeyword {
    return node.kind === "HandleKeyword";
  }

  public static isHandleTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.HandleTypeDesc {
    return node.kind === "HandleTypeDesc";
  }

  public static isIdentifierToken(
    node: Ballerina.STNode
  ): node is Ballerina.IdentifierToken {
    return node.kind === "IdentifierToken";
  }

  public static isIfElseStatement(
    node: Ballerina.STNode
  ): node is Ballerina.IfElseStatement {
    return node.kind === "IfElseStatement";
  }

  public static isIfKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.IfKeyword {
    return node.kind === "IfKeyword";
  }

  public static isImportDeclaration(
    node: Ballerina.STNode
  ): node is Ballerina.ImportDeclaration {
    return node.kind === "ImportDeclaration";
  }

  public static isImportKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ImportKeyword {
    return node.kind === "ImportKeyword";
  }

  public static isImportOrgName(
    node: Ballerina.STNode
  ): node is Ballerina.ImportOrgName {
    return node.kind === "ImportOrgName";
  }

  public static isInKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.InKeyword {
    return node.kind === "InKeyword";
  }

  public static isIndexedExpression(
    node: Ballerina.STNode
  ): node is Ballerina.IndexedExpression {
    return node.kind === "IndexedExpression";
  }

  public static isIntKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.IntKeyword {
    return node.kind === "IntKeyword";
  }

  public static isIntTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.IntTypeDesc {
    return node.kind === "IntTypeDesc";
  }

  public static isInvalid(node: Ballerina.STNode): node is Ballerina.Invalid {
    return node.kind === "Invalid";
  }

  public static isIsKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.IsKeyword {
    return node.kind === "IsKeyword";
  }

  public static isListConstructor(
    node: Ballerina.STNode
  ): node is Ballerina.ListConstructor {
    return node.kind === "ListConstructor";
  }

  public static isListenerDeclaration(
    node: Ballerina.STNode
  ): node is Ballerina.ListenerDeclaration {
    return node.kind === "ListenerDeclaration";
  }

  public static isListenerKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ListenerKeyword {
    return node.kind === "ListenerKeyword";
  }

  public static isLocalVarDecl(
    node: Ballerina.STNode
  ): node is Ballerina.LocalVarDecl {
    return node.kind === "LocalVarDecl";
  }

  public static isLockKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.LockKeyword {
    return node.kind === "LockKeyword";
  }

  public static isLockStatement(
    node: Ballerina.STNode
  ): node is Ballerina.LockStatement {
    return node.kind === "LockStatement";
  }

  public static isLtEqualToken(
    node: Ballerina.STNode
  ): node is Ballerina.LtEqualToken {
    return node.kind === "LtEqualToken";
  }

  public static isLtToken(node: Ballerina.STNode): node is Ballerina.LtToken {
    return node.kind === "LtToken";
  }

  public static isMapKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.MapKeyword {
    return node.kind === "MapKeyword";
  }

  public static isMappingConstructor(
    node: Ballerina.STNode
  ): node is Ballerina.MappingConstructor {
    return node.kind === "MappingConstructor";
  }

  public static isMetadata(node: Ballerina.STNode): node is Ballerina.Metadata {
    return node.kind === "Metadata";
  }

  public static isMethodCall(
    node: Ballerina.STNode
  ): node is Ballerina.MethodCall {
    return node.kind === "MethodCall";
  }

  public static isMinusToken(
    node: Ballerina.STNode
  ): node is Ballerina.MinusToken {
    return node.kind === "MinusToken";
  }

  public static isModuleVarDecl(
    node: Ballerina.STNode
  ): node is Ballerina.ModuleVarDecl {
    return node.kind === "ModuleVarDecl";
  }

  public static isNamedArg(node: Ballerina.STNode): node is Ballerina.NamedArg {
    return node.kind === "NamedArg";
  }

  public static isNamedWorkerDeclaration(
    node: Ballerina.STNode
  ): node is Ballerina.NamedWorkerDeclaration {
    return node.kind === "NamedWorkerDeclaration";
  }

  public static isNamedWorkerDeclarator(
    node: Ballerina.STNode
  ): node is Ballerina.NamedWorkerDeclarator {
    return node.kind === "NamedWorkerDeclarator";
  }

  public static isNilLiteral(
    node: Ballerina.STNode
  ): node is Ballerina.NilLiteral {
    return node.kind === "NilLiteral";
  }

  public static isNilTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.NilTypeDesc {
    return node.kind === "NilTypeDesc";
  }

  public static isNotDoubleEqualToken(
    node: Ballerina.STNode
  ): node is Ballerina.NotDoubleEqualToken {
    return node.kind === "NotDoubleEqualToken";
  }

  public static isObjectField(
    node: Ballerina.STNode
  ): node is Ballerina.ObjectField {
    return node.kind === "ObjectField";
  }

  public static isObjectKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ObjectKeyword {
    return node.kind === "ObjectKeyword";
  }

  public static isObjectTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.ObjectTypeDesc {
    return node.kind === "ObjectTypeDesc";
  }

  public static isOnKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.OnKeyword {
    return node.kind === "OnKeyword";
  }

  public static isOpenBracePipeToken(
    node: Ballerina.STNode
  ): node is Ballerina.OpenBracePipeToken {
    return node.kind === "OpenBracePipeToken";
  }

  public static isOpenBraceToken(
    node: Ballerina.STNode
  ): node is Ballerina.OpenBraceToken {
    return node.kind === "OpenBraceToken";
  }

  public static isOpenBracketToken(
    node: Ballerina.STNode
  ): node is Ballerina.OpenBracketToken {
    return node.kind === "OpenBracketToken";
  }

  public static isOpenParenToken(
    node: Ballerina.STNode
  ): node is Ballerina.OpenParenToken {
    return node.kind === "OpenParenToken";
  }

  public static isOptionalTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.OptionalTypeDesc {
    return node.kind === "OptionalTypeDesc";
  }

  public static isParameterizedTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.ParameterizedTypeDesc {
    return node.kind === "ParameterizedTypeDesc";
  }

  public static isPipeToken(
    node: Ballerina.STNode
  ): node is Ballerina.PipeToken {
    return node.kind === "PipeToken";
  }

  public static isPlusToken(
    node: Ballerina.STNode
  ): node is Ballerina.PlusToken {
    return node.kind === "PlusToken";
  }

  public static isPositionalArg(
    node: Ballerina.STNode
  ): node is Ballerina.PositionalArg {
    return node.kind === "PositionalArg";
  }

  public static isPublicKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.PublicKeyword {
    return node.kind === "PublicKeyword";
  }

  public static isQualifiedNameReference(
    node: Ballerina.STNode
  ): node is Ballerina.QualifiedNameReference {
    return node.kind === "QualifiedNameReference";
  }

  public static isQuestionMarkToken(
    node: Ballerina.STNode
  ): node is Ballerina.QuestionMarkToken {
    return node.kind === "QuestionMarkToken";
  }

  public static isRawTemplateExpression(
    node: Ballerina.STNode
  ): node is Ballerina.RawTemplateExpression {
    return node.kind === "RawTemplateExpression";
  }

  public static isRecordField(
    node: Ballerina.STNode
  ): node is Ballerina.RecordField {
    return node.kind === "RecordField";
  }

  public static isRecordKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.RecordKeyword {
    return node.kind === "RecordKeyword";
  }

  public static isRecordTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.RecordTypeDesc {
    return node.kind === "RecordTypeDesc";
  }

  public static isRemoteMethodCallAction(
    node: Ballerina.STNode
  ): node is Ballerina.RemoteMethodCallAction {
    return node.kind === "RemoteMethodCallAction";
  }

  public static isRequiredParam(
    node: Ballerina.STNode
  ): node is Ballerina.RequiredParam {
    return node.kind === "RequiredParam";
  }

  public static isResourceKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ResourceKeyword {
    return node.kind === "ResourceKeyword";
  }

  public static isRestParam(
    node: Ballerina.STNode
  ): node is Ballerina.RestParam {
    return node.kind === "RestParam";
  }

  public static isReturnKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ReturnKeyword {
    return node.kind === "ReturnKeyword";
  }

  public static isReturnStatement(
    node: Ballerina.STNode
  ): node is Ballerina.ReturnStatement {
    return node.kind === "ReturnStatement";
  }

  public static isReturnTypeDescriptor(
    node: Ballerina.STNode
  ): node is Ballerina.ReturnTypeDescriptor {
    return node.kind === "ReturnTypeDescriptor";
  }

  public static isReturnsKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ReturnsKeyword {
    return node.kind === "ReturnsKeyword";
  }

  public static isRightArrowToken(
    node: Ballerina.STNode
  ): node is Ballerina.RightArrowToken {
    return node.kind === "RightArrowToken";
  }

  public static isSemicolonToken(
    node: Ballerina.STNode
  ): node is Ballerina.SemicolonToken {
    return node.kind === "SemicolonToken";
  }

  public static isServiceBody(
    node: Ballerina.STNode
  ): node is Ballerina.ServiceBody {
    return node.kind === "ServiceBody";
  }

  public static isServiceDeclaration(
    node: Ballerina.STNode
  ): node is Ballerina.ServiceDeclaration {
    return node.kind === "ServiceDeclaration";
  }

  public static isServiceKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.ServiceKeyword {
    return node.kind === "ServiceKeyword";
  }

  public static isSimpleNameReference(
    node: Ballerina.STNode
  ): node is Ballerina.SimpleNameReference {
    return node.kind === "SimpleNameReference";
  }

  public static isSlashToken(
    node: Ballerina.STNode
  ): node is Ballerina.SlashToken {
    return node.kind === "SlashToken";
  }

  public static isSpecificField(
    node: Ballerina.STNode
  ): node is Ballerina.SpecificField {
    return node.kind === "SpecificField";
  }

  public static isSpreadField(
    node: Ballerina.STNode
  ): node is Ballerina.SpreadField {
    return node.kind === "SpreadField";
  }

  public static isStringKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.StringKeyword {
    return node.kind === "StringKeyword";
  }

  public static isStringLiteral(
    node: Ballerina.STNode
  ): node is Ballerina.StringLiteral {
    return node.kind === "StringLiteral";
  }

  public static isStringTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.StringTypeDesc {
    return node.kind === "StringTypeDesc";
  }

  public static isSyntaxTree(
    node: Ballerina.STNode
  ): node is Ballerina.SyntaxTree {
    return node.kind === "SyntaxTree";
  }

  public static isTemplateString(
    node: Ballerina.STNode
  ): node is Ballerina.TemplateString {
    return node.kind === "TemplateString";
  }

  public static isTrapExpression(
    node: Ballerina.STNode
  ): node is Ballerina.TrapExpression {
    return node.kind === "TrapExpression";
  }

  public static isTrapKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.TrapKeyword {
    return node.kind === "TrapKeyword";
  }

  public static isTrueKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.TrueKeyword {
    return node.kind === "TrueKeyword";
  }

  public static isTypeCastExpression(
    node: Ballerina.STNode
  ): node is Ballerina.TypeCastExpression {
    return node.kind === "TypeCastExpression";
  }

  public static isTypeCastParam(
    node: Ballerina.STNode
  ): node is Ballerina.TypeCastParam {
    return node.kind === "TypeCastParam";
  }

  public static isTypeDefinition(
    node: Ballerina.STNode
  ): node is Ballerina.TypeDefinition {
    return node.kind === "TypeDefinition";
  }

  public static isTypeDesc(node: Ballerina.STNode): node is Ballerina.TypeDesc {
    return node.kind === "TypeDesc";
  }

  public static isTypeKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.TypeKeyword {
    return node.kind === "TypeKeyword";
  }

  public static isTypeTestExpression(
    node: Ballerina.STNode
  ): node is Ballerina.TypeTestExpression {
    return node.kind === "TypeTestExpression";
  }

  public static isUnaryExpression(
    node: Ballerina.STNode
  ): node is Ballerina.UnaryExpression {
    return node.kind === "UnaryExpression";
  }

  public static isUnionTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.UnionTypeDesc {
    return node.kind === "UnionTypeDesc";
  }

  public static isVarKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.VarKeyword {
    return node.kind === "VarKeyword";
  }

  public static isVarTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.VarTypeDesc {
    return node.kind === "VarTypeDesc";
  }

  public static isWhileKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.WhileKeyword {
    return node.kind === "WhileKeyword";
  }

  public static isWhileStatement(
    node: Ballerina.STNode
  ): node is Ballerina.WhileStatement {
    return node.kind === "WhileStatement";
  }

  public static isWorkerKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.WorkerKeyword {
    return node.kind === "WorkerKeyword";
  }

  public static isXmlElement(
    node: Ballerina.STNode
  ): node is Ballerina.XmlElement {
    return node.kind === "XmlElement";
  }

  public static isXmlElementEndTag(
    node: Ballerina.STNode
  ): node is Ballerina.XmlElementEndTag {
    return node.kind === "XmlElementEndTag";
  }

  public static isXmlElementStartTag(
    node: Ballerina.STNode
  ): node is Ballerina.XmlElementStartTag {
    return node.kind === "XmlElementStartTag";
  }

  public static isXmlKeyword(
    node: Ballerina.STNode
  ): node is Ballerina.XmlKeyword {
    return node.kind === "XmlKeyword";
  }

  public static isXmlTemplateExpression(
    node: Ballerina.STNode
  ): node is Ballerina.XmlTemplateExpression {
    return node.kind === "XmlTemplateExpression";
  }

  public static isXmlText(node: Ballerina.STNode): node is Ballerina.XmlText {
    return node.kind === "XmlText";
  }

  public static isXmlTextContent(
    node: Ballerina.STNode
  ): node is Ballerina.XmlTextContent {
    return node.kind === "XmlTextContent";
  }

  public static isXmlTypeDesc(
    node: Ballerina.STNode
  ): node is Ballerina.XmlTypeDesc {
    return node.kind === "XmlTypeDesc";
  }
}
